/*retorna todos los productos*/
CREATE PROCEDURE [dbo].[AddNewOrder]
	@custid AS INT, 
	@empid AS INT, 
	@shipperid AS INT, 
	@Shipname AS NVARCHAR(40), 
	@Shipaddress AS NVARCHAR(60), 
	@Shipcity AS NVARCHAR(15),
	@Shipcountry AS NVARCHAR(15),
	@Orderdate AS DATETIME, 
	@Requireddate AS DATETIME, 
	@Shippeddate AS DATETIME, 
	@Freight AS MONEY, 
	@productid AS INT,
	@unitprice AS MONEY,
	@qty AS SMALLINT,
	@discount AS NUMERIC
AS
BEGIN 
	SET NOCOUNT ON
	
	INSERT INTO Sales.Orders
		(empid, custid, shipperid, Shipname, Shipaddress, Shipcity, Orderdate, Requireddate, Shippeddate, Freight, Shipcountry)
	VALUES
		(@empid, @custid, @shipperid, @Shipname, @Shipaddress, @Shipcity, @Orderdate, @Requireddate, @Shippeddate, @Freight, @Shipcountry)
	
	DECLARE @IdOrder INT = @@IDENTITY

	INSERT INTO Sales.OrderDetails
		(orderid, productid, unitprice, qty, discount)
	VALUES
		(@IdOrder, @productid, @unitprice, @qty, @discount)
		
	DECLARE @IdOrderDetails INT = @@IDENTITY
	
	SELECT 
		SO.*, 
		SOD.discount, SOD.productid, SOD.qty 'quantity', SOD.unitprice,
		SO.empid 'employeeId'
	FROM 
		Sales.Orders SO
	INNER JOIN Sales.OrderDetails SOD ON SOD.orderid = SO.orderid
	where SO.orderid = @IdOrder
END

/*Probar procedimiento*/

/*EXECUTE AddNewOrder 
@custid = 20,
@empid = 1, 
@shipperid = 1, 
@Shipname = 'shipName', 
@Shipaddress = 'shipAddres', 
@Shipcity = 'shipCity', 
@Shipcountry = 'shipCountry', 
@Orderdate = '03/29/2018', 
@Requireddate = '03/29/2018', 
@Shippeddate = '03/29/2018', 
@Freight = '1,52', 
@productid = 2, 
@unitprice = '15,000', 
@qty = 1, 
@discount = '1'*/