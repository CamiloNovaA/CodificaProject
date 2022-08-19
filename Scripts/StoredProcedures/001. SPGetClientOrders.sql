/*Retorna las ordenes de un cliente*/
CREATE PROCEDURE GetClientOrders 
	@IdCustomer nvarchar(30)
AS
BEGIN
	SET NOCOUNT ON

	SELECT 
		orderid,
		requireddate,
		shippeddate,
		shipname,
		shipaddress,
		shipcity
	FROM 
		Sales.Orders
	WHERE
		custid = @IdCustomer
END

/*Probar procedimiento*/
--EXEC GetClientOrders @IdCustomer = 1