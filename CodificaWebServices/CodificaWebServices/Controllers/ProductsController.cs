using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CodificaWebServices.Models;

namespace CodificaWebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly StoreSampleContext _context;

        public ProductsController(StoreSampleContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public List<ProductList> GetProducts()
        {
            if (_context.ProductList == null)
            {
                return null;
            }

            List<ProductList> ClientOrders = _context.ProductList.FromSqlRaw($"GetProducts").ToList();

            return ClientOrders;
        }
    }
}
