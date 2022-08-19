namespace CodificaWebServices.Models
{
    public partial class OrderByClient
    {
        public int? orderid { get; set; }
        public DateTime? requireddate { get; set; }
        public DateTime? shippeddate { get; set; }
        public string? shipname { get; set; }
        public string? shipaddress { get; set; }
        public string? shipcity { get; set; }
    }
}
