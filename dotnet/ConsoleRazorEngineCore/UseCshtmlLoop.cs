
using ConsoleRazorEngineCore.Model;
using RazorEngineCore;

namespace ConsoleRazorEngineCore
{
    public class UseCshtmlLoop
    {
        public static void Execute()
        {
            IRazorEngine razorEngine = new RazorEngine();

            var razorContent = System.IO.File.ReadAllText("View/loop.cshtml", System.Text.Encoding.UTF8);
            var template = razorEngine.Compile<RazorEngineTemplateBase<IPInfoViewModel>>(razorContent);
            var model = new IPInfoViewModel()
            {
                Ip = "8.8.8.8",
                Servicos = Servicos()
            };
            
            // Compile o modelo Razor e renderize-o
            string html = template.Run(instance =>
            {
                instance.Model = model;
            });

            Console.WriteLine(html);

        }

        public static string Servicos()
        {
            IRazorEngine razorEngine = new RazorEngine();

            var razorContent = System.IO.File.ReadAllText("View/servicos.cshtml", System.Text.Encoding.UTF8);
            var template = razorEngine.Compile<RazorEngineTemplateBase<Teste>>(razorContent);
            var model = new Teste()
                {
                    Servico = "IPVA 1ª Cota 2023",
                    Vencimento = "08/11/2022",
                    ValorNominal = "293,47",
                    ValorCorrigido = "293,47",
                    Desconto = "0,00",
                    Juros = "0,00",
                    Multa = "0,00",
                    ValorPagar = "293,47"
                };

            // Compile o modelo Razor e renderize-o
            string html = template.Run(instance =>
            {
                instance.Model = model;
            });

            Console.WriteLine(html);
            return html;

        }
    }
}