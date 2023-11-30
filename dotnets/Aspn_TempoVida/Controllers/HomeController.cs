using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Aspn_TempoVida.Models;
using Aspn_TempoVida.Services;

namespace Aspn_TempoVida.Controllers;

public class HomeController : Controller
{
    private readonly IOperationTransient _operationTransient1;
    private readonly IOperationTransient _operationTransient2;

    private readonly IOperationScoped _operationScoped1;
    private readonly IOperationScoped _operationScoped2;

    private readonly IOperationSingleton _operationSingleton1;
    private readonly IOperationSingleton _operationSingleton2;

    public HomeController(
        IOperationTransient operationTransient1, 
        IOperationTransient operationTransient2, 
        IOperationScoped operationScoped1, 
        IOperationScoped operationScoped2, 
        IOperationSingleton operationSingleton1, 
        IOperationSingleton operationSingleton2)
    {
        _operationTransient1 = operationTransient1;
        _operationTransient2 = operationTransient2;
        _operationScoped1 = operationScoped1;
        _operationScoped2 = operationScoped2;
        _operationSingleton1 = operationSingleton1;
        _operationSingleton2 = operationSingleton2;
    }

    public string Index()
    {
        return 
            $"Transient1            : {_operationTransient1.OperationId} \n" +
            $"Transient2            : {_operationTransient2.OperationId} \n\n" +
            $"Scoped1               : {_operationScoped1.OperationId} \n" +
            $"Scoped2               : {_operationScoped2.OperationId} \n\n" +
            $"Singleton1            : {_operationSingleton1.OperationId} \n" +
            $"Singleton2            : {_operationSingleton2.OperationId} \n\n" ;
    }
}
