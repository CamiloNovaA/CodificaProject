using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodificaWebServices.Models
{
    public partial class NewOrder
    {
        public int? custid { get; set; }
        public int? employeeId { get; set; }
        public int? shipperId { get; set; }
        public string? shipName { get; set; } = null!;
        public string? shipAddress { get; set; } = null!;
        public string? shipCity { get; set; } = null!;
        public string? shipCountry { get; set; } = null!;
        [JsonProperty("dateOfBirth")]
        public DateTime orderDate { get; set; }
        [JsonProperty("dateOfBirth")]
        public DateTime requiredDate { get; set; }
        [JsonProperty("dateOfBirth")]
        public DateTime shippedDate { get; set; }
        public decimal? freight { get; set; }
        /// Order Detail
        public int? productId { get; set; }
        public decimal? unitPrice { get; set; }
        public short? quantity { get; set; }
        public decimal? discount { get; set; }
    }
}
