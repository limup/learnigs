using System.Runtime.InteropServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aspn_TempoVida.Services
{
    public class Operation : 
    IOperationTransient,
    IOperationScoped,
    IOperationSingleton
    {
        public string OperationId { get; }

        public Operation()
        {
            OperationId = Guid.NewGuid().ToString();
        }
    }
}