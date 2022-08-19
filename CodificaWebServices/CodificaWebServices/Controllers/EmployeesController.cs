using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CodificaWebServices.Models;

namespace CodificaWebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly StoreSampleContext _context;

        public EmployeesController(StoreSampleContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public List<EmployeeList> GetEmployees()
        {
            if (_context.EmployeeLists == null)
            {
                return null;
            }

            List<EmployeeList> ClientOrders = _context.EmployeeLists.FromSqlRaw($"GetEmployees").ToList();

            return ClientOrders;
        }
    }
}
