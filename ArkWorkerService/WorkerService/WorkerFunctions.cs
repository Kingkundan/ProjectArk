using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkerService
{
    public class WorkerFunctions
    {
        
        public int Addition(int a,int b)
        {
            return a + b;
        }
        public int GetMaximum(int[] values)
        {
            int Temp = 0;
            foreach (var value in values)
            {
                if (Temp < value) { 
                    Temp = value;
                }
            }
            return Temp;
        }
        public int GetMinimum(int[] values)
        {
            int Temp = 0;
            foreach (var value in values)
            {
                if (Temp == 0)
                {
                    Temp = value;
                }
                if (Temp > value)
                {
                    Temp = value;
                }
            }
            return Temp;
        }

    }
}
