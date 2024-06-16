namespace ArkConsole.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime? OrderPlaced { get; set; }
        public DateTime? Orderfullfilled { get; set; }
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public ICollection<OrderDetail>? OrderDetails { get; set; }

    }
}