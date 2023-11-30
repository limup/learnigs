using System.Security.Cryptography.X509Certificates;
using RestSharp;

// Caminho do arquivo PFX contendo o certificado e a chave privada
string pfxFilePath = "certificado.pfx";
string pfxPassword = "geradua";

string certPath = Path.Combine(Environment.CurrentDirectory, pfxFilePath);

// Carrega o certificado e a chave privada do arquivo PFX
X509Certificate2 clientCertificate = new(certPath, pfxPassword);

var options = new RestClientOptions("https://api-pix-sandbox.banestes.b.br")
{
    MaxTimeout = -1,
    ClientCertificates = new X509CertificateCollection { clientCertificate },
};

var client = new RestClient(options);
var request = new RestRequest("/oauth/v1/access-token", Method.Post);
request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
request.AddHeader("Authorization", "Basic ZDAzYWMyYzUtYTU5ZC00OWIxLWIxYmEtMzkwZmQyYTI4MTQ3OmY0YWFlZWM1LTUwNGEtNGVlMS1hYzkwLThlMDFhMTE3MzA4Yw==");
request.AddParameter("grant_type", "client_credentials");

RestResponse response = await client.ExecuteAsync(request);
Console.WriteLine(response.Content);

