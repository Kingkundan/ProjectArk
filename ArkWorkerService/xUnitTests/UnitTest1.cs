using WorkerService;

namespace xUnitTests
{
    public class UnitTest1
    {
        [Fact]
        public void MaxTest()
        {
            WorkerFunctions workerFunctions = new WorkerFunctions();

            int[] Values = new[] { 1, 2, 4, 7, 5 };

            int max = workerFunctions.GetMaximum(Values);

            Assert.Equal(Values.Max(), max);

        }
        [Fact]
        public void MinTest()
        {
            WorkerFunctions workerFunctions = new WorkerFunctions();

            int[] Values = new[] { 1, 2, 4, 7, 5 };

            int min = workerFunctions.GetMinimum(Values);

            Assert.Equal(Values.Min(), min);

        }
    }
}