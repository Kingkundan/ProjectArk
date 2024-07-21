using Coravel.Invocable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkerService
{
    internal class ProcessOrder : IInvocable
    {
        public ILogger<ProcessOrder> _logger { get; }
        public ProcessOrder(ILogger<ProcessOrder> logger)
        {
            _logger = logger;
        }


        public async Task Invoke()
        {
            var JobID  = Guid.NewGuid();
            _logger.LogInformation("Job:{JobID} has Started", JobID);
            _logger.LogWarning("Process is taking more time than expected");
             await Task.Delay(2000);
            _logger.LogInformation("Job:{JobID} has Complete", JobID);
        }
    }
}
