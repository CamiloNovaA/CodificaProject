using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CodificaWebServices.Models;

namespace CodificaWebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippersController : ControllerBase
    {
        private readonly StoreSampleContext _context;

        public ShippersController(StoreSampleContext context)
        {
            _context = context;
        }

        // GET: api/Shippers
        [HttpGet]
        public List<ShipperList> GetShippers()
        {
            if (_context.ShipperList == null)
            {
                return null;
            }

            List<ShipperList> ClientOrders = _context.ShipperList.FromSqlRaw($"GetShippers").ToList();

            return ClientOrders;
        }
    }
}
