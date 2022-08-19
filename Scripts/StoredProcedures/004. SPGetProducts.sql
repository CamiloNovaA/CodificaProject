/*retorna todos los productos*/
CREATE PROCEDURE GetProducts
AS
BEGIN 
	SELECT 
		Productid,
		Productname
	FROM 
		Production.Products
END

/*Probar procedimiento*/
--EXEC GetProducts