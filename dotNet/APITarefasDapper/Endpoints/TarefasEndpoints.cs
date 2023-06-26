using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APITarefasDapper.Data;
using Dapper.Contrib.Extensions;
using  static APITarefasDapper.Data.TarefaContext;

namespace APITarefasDapper.Endpoints;

public static class TarefasEndpoints
{
    public static void MapTarefasEndpoints(this WebApplication app)
    {
        app.MapGet("/", () => $"Bem Vindo a API Tarefas {DateTime.Now}");

        app.MapGet("/tarefas", async(GetConnetcion connectionGetter) =>
        {
            using var con = await connectionGetter();
            var tarefas = con.GetAll<Tarefa>().ToList();

            if (tarefas is null)
                return Results.NotFound();

            return Results.Ok(tarefas);
        });
    }
}