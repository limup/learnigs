using APITarefasDapper.Endpoints;
using APITarefasDapper.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.AddPersistence();

var app = builder.Build();
app.MapTarefasEndpoints();


app.Run();
