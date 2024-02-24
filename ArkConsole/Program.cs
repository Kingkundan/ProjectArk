namespace ArkConsole
{
    public class Car // public class
    {
        public string model; // public field
        private int speed; // private field
        protected int year; // protected field
        internal string color; // internal field
        protected internal int price; // protected internal field
        private protected int mileage; // private protected field

        public void Drive() // public method
        {
            Console.WriteLine("Driving");
        }

        private void Accelerate() // private method
        {
            Console.WriteLine("Accelerating");
        }

        protected void Brake() // protected method
        {
            Console.WriteLine("Braking");
        }

        internal void Paint() // internal method
        {
            Console.WriteLine("Painting");
        }

        protected internal void Sell() // protected internal method
        {
            Console.WriteLine("Selling");
        }

        private protected void Repair() // private protected method
        {
            Console.WriteLine("Repairing");
        }
    }

    internal class Program
    {


        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
        }
    }
}
