/*retorna todos los productos*/
alter PROCEDURE AddProductToOrder
	@orderid AS INT,
	@productid AS INT,
	@unitprice AS MONEY,
	@qty AS SMALLINT,
	@discount AS NUMERIC
AS
BEGIN 
	SET NOCOUNT ON

	INSERT INTO Sales.OrderDetails
		(orderid, productid, unitprice, qty, discount)
	VALUES
		(@orderid, @productid, @unitprice, @qty, @discount)
END

/*Probar procedimiento*/
/*
	EXEC AddProductToOrder
		@orderid = 10248,
		@productid = 1,
		@unitprice = '9.9',
		@qty = 1,
		@discount = 0
*/