using Microsoft.EntityFrameworkCore;

namespace CodificaWebServices.Models
{
    public partial class StoreSampleContext : DbContext
    {
        public StoreSampleContext()
        {
        }

        public StoreSampleContext(DbContextOptions<StoreSampleContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CustomerSalesPrediction> CustomerSalesPredictions { get; set; } = null!;
        public virtual DbSet<OrderByClient> OrderByClients { get; set; } = null!;        
        public virtual DbSet<NewOrder> NewOrders { get; set; } = null!;        
        public virtual DbSet<ShipperList> ShipperList { get; set; } = null!;
        public virtual DbSet<EmployeeList> EmployeeLists { get; set; } = null!;
        public virtual DbSet<ProductList> ProductList { get; set; } = null!;    

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CustomerSalesPrediction>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.custid);
                entity.Property(e => e.CustomerName);
                entity.Property(e => e.LastOrderDate);
                entity.Property(e => e.NextPredictedOrder);
            });

            modelBuilder.Entity<OrderByClient>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.orderid);
                entity.Property(e => e.requireddate);
                entity.Property(e => e.shippeddate);
                entity.Property(e => e.shipname);
                entity.Property(e => e.shipaddress);
                entity.Property(e => e.shipcity);
            });

            modelBuilder.Entity<NewOrder>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.custid);
                entity.Property(e => e.employeeId);
                entity.Property(e => e.shipperId);
                entity.Property(e => e.shipName);
                entity.Property(e => e.shipAddress);
                entity.Property(e => e.shipCity);
                entity.Property(e => e.shipCountry);
                entity.Property(e => e.orderDate);
                entity.Property(e => e.requiredDate);
                entity.Property(e => e.shippedDate);
                entity.Property(e => e.freight);
                entity.Property(e => e.productId);
                entity.Property(e => e.unitPrice);
                entity.Property(e => e.quantity);
                entity.Property(e => e.discount);
            });

            modelBuilder.Entity<ShipperList>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Shipperid);
                entity.Property(e => e.Companyname);
            });

            modelBuilder.Entity<EmployeeList>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Empid);
                entity.Property(e => e.Fullname);
            });

            modelBuilder.Entity<ProductList>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Productid);
                entity.Property(e => e.Productname);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
