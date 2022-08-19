/*retorna todos los empleados*/
CREATE PROCEDURE GetEmployees
AS
BEGIN 
	SELECT 
		empid,
		CONCAT(firstname, ' ', lastname) as fullname
	FROM 
		HR.Employees
END

/*Probar procedimiento*/
--EXEC GetEmployees