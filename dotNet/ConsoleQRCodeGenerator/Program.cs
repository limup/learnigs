namespace ConsoleQRCodeGenerator
{
    public class Program
    {
        public static void Main()
        {
            //Exemplo de QRCode copia e cola
            string qrCodeData = "00020126580014BR.GOV.BCB.PIX01368f48d9cc-3cd7-4656-bc37-4ef27632ceb2520400005303986540550.005802BR5925Arnaldo Vieira De Lima Ju6009SAO PAULO610805409000622505210x7gXmxY1j5JoqX1hoxhl63045D10";

            //Exemplo de código de barra
            string barCodeData = "858000000003145102192029308310020233801008785669";

            Console.WriteLine("QRCode gerado com sucesso em: data:image/png;base64," + qrCodeData.ConvertQRCodeToImgemBase64());
            Console.WriteLine("\n\nCódigo de barra gerado com sucesso em: data:image/png;base64," + barCodeData.ConvertToImgemBase64());
        }

        
        }
    }
