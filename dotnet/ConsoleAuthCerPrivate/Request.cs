using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;

namespace ConsoleAuthCerPrivate
{
    public class Request
    {
        public static async Task RequestAccessTokenAsync()
        {
            try
            {
                using (HttpClient client = CreateHttpClientWithCertificate())
                {
                    string clientId = "d03ac2c5-a59d-49b1-b1ba-390fd2a28147";
                    string clientSecret = "f4aaeec5-504a-4ee1-ac90-8e01a117308c";
                    string authValue = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));
                    Console.WriteLine($"Conteúdo Authorization: {authValue}");

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authValue);

                    HttpResponseMessage response = await client.PostAsync("oauth/v1/access-token", new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("grant_type", "client_credentials")
                    }));

                    if (response.IsSuccessStatusCode)
                    {
                        string responseBody = await response.Content.ReadAsStringAsync();
                        Console.WriteLine(responseBody);
                        Console.ReadLine();
                    }
                    else
                    {
                        Console.WriteLine($"Request failed: {response.StatusCode}");
                        Console.ReadLine();
                    }
                }
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Ocorreu uma exceção ao enviar a solicitação HTTP: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                    Console.ReadLine();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ocorreu uma exceção: {ex.Message}");
                Console.ReadLine();
            }
        }
        private static HttpClient CreateHttpClientWithCertificate()
        {
            // Caminho dos arquivos do certificado e chave privada
            string certificateFilePath = "REQUEST_CERTIFICADO (1).cer";
            string privateKeyFilePath = "PRIVATE_KEY.key";

            string certPath = Path.Combine(Environment.CurrentDirectory, certificateFilePath);
            string keyPath = Path.Combine(Environment.CurrentDirectory, privateKeyFilePath);

            // Carrega o certificado .cer e a chave privada .key
            X509Certificate2 clientCertificate = new(certPath);
            Console.WriteLine("Certificado carregado com sucesso.");

            // Carrega a chave privada usando a biblioteca BouncyCastle
            RSA privateKey = LoadRsaPrivateKey(keyPath);

            // Associe o certificado e a chave privada à solicitação
            clientCertificate = clientCertificate.CopyWithPrivateKey(privateKey);

            // Crie o LoggingHandler e passe o HttpClientHandler
            var handler = new HttpClientHandler();
            handler.ClientCertificateOptions = ClientCertificateOption.Manual;
            handler.ClientCertificates.Add(clientCertificate);

            // Ignorar a validação do certificado SSL (APENAS PARA TESTES!)
            handler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true;

            var loggingHandler = new LoggingHandler(handler);

            // Crie um novo HttpClient com o LoggingHandler
            var httpClient = new HttpClient(loggingHandler);
            httpClient.BaseAddress = new Uri("https://api-pix-sandbox.banestes.b.br/");
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));

            return httpClient;
        }

        private static RSA LoadRsaPrivateKey(string privateKeyFilePath)
        {

            if (!File.Exists(privateKeyFilePath))
            {
                Console.WriteLine($"O arquivo {privateKeyFilePath} não existe.");
                return null;
            }

            try
            {
                using (var reader = new StreamReader(privateKeyFilePath))
                {
                    // Verifique se o StreamReader está retornando um valor não nulo
                    if (reader == null)
                    {
                        Console.WriteLine($"Falha ao criar o StreamReader para o arquivo {privateKeyFilePath}.");
                        return null;
                    }

                    var pemReader = new PemReader(reader);
                    object obj = pemReader.ReadObject();

                    // Verifique se o obj não é nulo
                    if (obj == null)
                    {
                        Console.WriteLine($"Falha ao ler o arquivo PEM {privateKeyFilePath}. O obj está vazio.");
                        return null;
                    }

                    // Verifique o conteúdo do objeto lido
                    Console.WriteLine($"Tipo do objeto lido: {obj.GetType().FullName}");
                    Console.WriteLine($"Conteúdo do objeto lido: {obj}");

                    if (obj is RsaPrivateCrtKeyParameters rsaParams)
                    {
                        try
                        {
                            // Converte os parâmetros RSA do BouncyCastle para RSAParameters
                            RSAParameters parameters = new RSAParameters
                            {
                                Modulus = rsaParams.Modulus.ToByteArrayUnsigned(),
                                Exponent = rsaParams.PublicExponent.ToByteArrayUnsigned(),
                                D = rsaParams.Exponent.ToByteArrayUnsigned(),
                                P = rsaParams.P.ToByteArrayUnsigned(),
                                Q = rsaParams.Q.ToByteArrayUnsigned(),
                                DP = rsaParams.DP.ToByteArrayUnsigned(),
                                DQ = rsaParams.DQ.ToByteArrayUnsigned(),
                                InverseQ = rsaParams.QInv.ToByteArrayUnsigned()
                            };

                            // Exibe os valores dos parâmetros
                            Console.WriteLine("Chave privada carregada com sucesso.");
                            Console.WriteLine($"Modulus: {Convert.ToBase64String(parameters.Modulus)}");
                            Console.WriteLine($"Exponent: {Convert.ToBase64String(parameters.Exponent)}");
                            Console.WriteLine($"D: {Convert.ToBase64String(parameters.D)}");
                            Console.WriteLine($"P: {Convert.ToBase64String(parameters.P)}");
                            Console.WriteLine($"Q: {Convert.ToBase64String(parameters.Q)}");
                            Console.WriteLine($"DP: {Convert.ToBase64String(parameters.DP)}");
                            Console.WriteLine($"DQ: {Convert.ToBase64String(parameters.DQ)}");
                            Console.WriteLine($"InverseQ: {Convert.ToBase64String(parameters.InverseQ)}");

                            var rsa = RSA.Create();
                            rsa.ImportParameters(parameters);
                            Console.WriteLine("Chave privada carregada com sucesso.");
                            return rsa;
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Falha ao converter o objeto lido em uma chave RSA: {ex.Message}");
                            return null;
                        }
                    }
                    else
                    {
                        Console.WriteLine($"Falha ao converter o objeto lido em um RsaPrivateCrtKeyParameters.");
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ocorreu uma exceção ao ler o arquivo PEM {privateKeyFilePath}: {ex.Message}");
                return null;
            }
        }
    }
}