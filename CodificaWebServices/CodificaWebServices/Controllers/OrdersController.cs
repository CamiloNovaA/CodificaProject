using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CodificaWebServices.Models;
using System.Text;

namespace CodificaWebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly StoreSampleContext _context;

        public OrdersController(StoreSampleContext context)
        {
            _context = context;
        }

        // GET: api/orders/GetOrdersByClient/5
        [HttpGet("GetOrdersByClient/{id}")]
        public List<OrderByClient> GetOrdersByClient(int id)
        {
            if (_context.OrderByClients == null)
            {
                return null;
            }

            List<OrderByClient> ClientOrders = _context.OrderByClients.FromSqlRaw($"GetClientOrders {id}").ToList();

            return ClientOrders;
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<IEnumerable<NewOrder>>> PostOrder(NewOrder order)
        {
            if (_context.NewOrders == null)
            {
                return null;
            }

            StringBuilder cmdSPAddNewOrder = new StringBuilder();

            cmdSPAddNewOrder.Append("EXECUTE AddNewOrder ");            
            cmdSPAddNewOrder.AppendLine($"@custid = {order.custid}, ");
            cmdSPAddNewOrder.AppendLine($"@empid = {order.employeeId}, ");
	        cmdSPAddNewOrder.AppendLine($"@shipperid = {order.shipperId}, ");
	        cmdSPAddNewOrder.AppendLine($"@Shipname = '{order.shipName}', ");
	        cmdSPAddNewOrder.AppendLine($"@Shipaddress = '{order.shipAddress}', ");
	        cmdSPAddNewOrder.AppendLine($"@Shipcity = '{order.shipCity}', ");
	        cmdSPAddNewOrder.AppendLine($"@Shipcountry = '{order.shipCountry}', ");
	        cmdSPAddNewOrder.AppendLine($"@Orderdate = '{order.orderDate:MM/dd/yyyy}', ");
	        cmdSPAddNewOrder.AppendLine($"@Requireddate = '{order.requiredDate:MM/dd/yyyy}', ");
	        cmdSPAddNewOrder.AppendLine($"@Shippeddate = '{order.shippedDate:MM/dd/yyyy}', ");
	        cmdSPAddNewOrder.AppendLine($"@Freight = '{order.freight}', ");
	        cmdSPAddNewOrder.AppendLine($"@productid = {order.productId}, ");
	        cmdSPAddNewOrder.AppendLine($"@unitprice = '{order.unitPrice}', ");
            cmdSPAddNewOrder.AppendLine($"@qty = {order.quantity}, ");
            cmdSPAddNewOrder.AppendLine($"@discount = '{order.discount}'");

            Console.Write(cmdSPAddNewOrder.ToString());

            return await _context.NewOrders.FromSqlRaw(cmdSPAddNewOrder.ToString()).ToListAsync();
        }
    }
}
