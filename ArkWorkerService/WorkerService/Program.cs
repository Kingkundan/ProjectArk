using Coravel;
using Serilog;
using Serilog.Formatting.Json;
namespace WorkerService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .WriteTo.File(new JsonFormatter(),"logs/log.txt", rollingInterval: RollingInterval.Day, restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Warning)
                .CreateLogger();

            try
            {


                IHost host = Host.CreateDefaultBuilder(args)
                    .ConfigureServices(services =>
                    {
                        services.AddScheduler();
                        services.AddTransient<ProcessOrder>();
                    })
                    .UseSerilog()
                    .Build();


                Log.Information("Service Starting..");
                host.Services.UseScheduler(scheduler =>
                {
                    var job = scheduler.Schedule<ProcessOrder>();

                    job.EverySeconds(2).PreventOverlapping("ProcessOrderJob");
                });
                host.Run();

            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Exception in application");
            }
            finally
            {
                Log.Information("Service Stopping..");
                Log.CloseAndFlush();
            }
        }
    }
}