/*retorna todos los transportistas*/
CREATE PROCEDURE GetShippers
AS
BEGIN 
	SELECT 
		shipperid,
		companyname
	FROM 
		Sales.Shippers
END

/*Probar procedimiento*/
--EXEC GetShippers