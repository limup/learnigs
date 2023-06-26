using System.Runtime.Versioning;
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

        app.MapGet("/tarefas/{id}", async (GetConnetcion connectionGetter, int id) => 
        {
            // using var con = await connectionGetter();
            // var tarefa = con.Get<Tarefa>(id);
            // return Results.Ok(tarefa);
            
            using var con = await connectionGetter();
            return con.Get<Tarefa>(id) is Tarefa tarefa ? Results.Ok(tarefa):Results.NotFound();

        });

        app.MapPost("/tarefas", async (GetConnetcion connectionGetter, Tarefa tarefa) =>
        {
            using var con = await connectionGetter();
            var id = con.Insert(tarefa);
            return Results.Created($"/tarefas/{id}", tarefa);
        });

        app.MapPut("/tarefas", async (GetConnetcion connectionGetter, Tarefa tarefa) =>
        {
            using var con = await connectionGetter();
            var id = con.Update(tarefa);
            return Results.Ok();
        });

        app.MapDelete("/tarefas/{id}", async (GetConnetcion connectionGetter, int id) =>
        {
            using var con = await connectionGetter();
            var deleted = con.Get<Tarefa>(id);

            if(deleted is null)
                return Results.NotFound();
            
            con.Delete(deleted);
            return Results.Ok(deleted);
        });
    }
}