using RazorEngineCore;

namespace ConsoleRazorEngineCore;

public class Simple
{
    public static void Execute()
    {
        IRazorEngine razorEngine = new RazorEngine();
        IRazorEngineCompiledTemplate template = razorEngine.Compile("Hello @Model.Name");

        string result = template.Run(new
        {
            Name = "Alexander"
        });

        Console.WriteLine(result);
    }
}