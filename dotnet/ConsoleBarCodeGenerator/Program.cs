//Exemplo de código de barra
using ConsoleBarCodeGenerator;

string barCodeData = "858000000003145102192029308310020233801008785669";

// See https://aka.ms/new-console-template for more information
Console.WriteLine("\n\nCódigo de barra gerado com sucesso em: data:image/png;base64," + barCodeData.ConvertToImgemBase64());
