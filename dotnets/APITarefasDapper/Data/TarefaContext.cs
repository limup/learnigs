using System.Data;

namespace APITarefasDapper.Data;

public class TarefaContext
{
    public delegate Task<IDbConnection> GetConnetcion(); 
}