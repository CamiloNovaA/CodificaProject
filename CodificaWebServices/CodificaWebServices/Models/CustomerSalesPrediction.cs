namespace CodificaWebServices.Models
{
    public partial class CustomerSalesPrediction
    {
        public int? custid { get; set; }
        public string? CustomerName { get; set; } = null!;
        public DateTime? LastOrderDate { get; set; }
        public DateTime? NextPredictedOrder { get; set; }
    }
}
