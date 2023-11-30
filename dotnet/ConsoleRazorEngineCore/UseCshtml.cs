
using ConsoleRazorEngineCore.Model;
using RazorEngineCore;

namespace ConsoleRazorEngineCore
{
    public class UseCshtml
    {
        public static void Execute()
        {
            IRazorEngine razorEngine = new RazorEngine();

            var razorContent = System.IO.File.ReadAllText("View/Index.cshtml", System.Text.Encoding.UTF8);
            var template = razorEngine.Compile<RazorEngineTemplateBase<IPInfoViewModel>>(razorContent);
            string html = template.Run(instance =>
            {
                instance.Model = new IPInfoViewModel()
                {
                    Ip = "8.8.8.8"
                };
            });

            Console.WriteLine(html);
        }
    }
}