using ArkConsole.Data;
using ArkConsole.Models;

namespace ArkConsole
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Console.WriteLine("Insert Data start");
            //InsertData();
            //Console.WriteLine("Insert Data complete");


            using DataContext context = new DataContext();



            var veggieSpecial = context.Products.Where(p => p.Name == "Vegie Special Pizza").FirstOrDefault();

            if(veggieSpecial != null )
            {
                context.Remove(veggieSpecial);
            }
            context.SaveChanges();

            var products = context.Products.Where(p => p.Price>1.00M).OrderBy(p => p.Name);
            foreach(var p in products)
            {
                Console.WriteLine($"Id: {p.Id}");
                Console.WriteLine($"Name: {p.Name}");
                Console.WriteLine($"Price: {p.Price}");
                Console.WriteLine(new string('-',20));
            }

        }

        static void InsertData()
        {
            using DataContext dataContext = new DataContext();

            Product veggieSpecial = new Product()
            {
                Name = "Peperonni Special Pizza",
                Price = 5.99m
            };

            dataContext.Add(veggieSpecial);

            Product deluxMeat = new Product()
            {
                Name = "Delux chicken Pizza",
                Price = 12.99m
            };
            dataContext.Add(deluxMeat);
            dataContext.SaveChanges();
        }


    }
}
