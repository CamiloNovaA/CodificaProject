using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CodificaWebServices.Models;

namespace CodificaWebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly StoreSampleContext _context;

        public CustomersController(StoreSampleContext context)
        {
            _context = context;
        }

        // GET: api/Customers/GetSalesDatePrediction
        [HttpGet("GetSalesDatePrediction")]
        public List<CustomerSalesPrediction> GetSalesDatePrediction()
        {
            if (_context.CustomerSalesPredictions == null)
            {
                return null;
            }

            List<CustomerSalesPrediction> CustomerSalesPrediction = _context.CustomerSalesPredictions.FromSqlRaw("SPSalesDatePrediction").ToList();

            return CustomerSalesPrediction;
        }
    }
}
