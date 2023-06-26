using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using static APITarefasDapper.Data.TarefaContext;

namespace APITarefasDapper.Extensions;

public static class ServiceCollectionsExtensions
{
    public static WebApplicationBuilder AddPersistence(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

        builder.Services.AddScoped<GetConnetcion>(sp => 
        async () =>{
            var connection = new MySqlConnection(connectionString);
            await connection.OpenAsync();
            return connection;
        });

        return builder;
    }
}