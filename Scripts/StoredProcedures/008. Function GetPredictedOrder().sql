CREATE FUNCTION GetPredictedOrder(@custid INT)
RETURNS int
AS
BEGIN
	DECLARE @Date AS DATE
	DECLARE @LastDate AS DATE
	DECLARE @DiffDate AS INT
	--DECLARE @custid AS INT
	--SET @custid = 72


	DECLARE GetDifference CURSOR FOR 
		SELECT DATEADD(dd, 0, DATEDIFF(dd, 0, orderdate)) FROM Sales.Orders
		WHERE custid = @custid
		GROUP BY orderdate
	ORDER BY orderdate DESC
	OPEN GetDifference
	FETCH NEXT FROM GetDifference INTO @Date
	WHILE @@fetch_status = 0
	BEGIN
		SET @LastDate = ISNULL(@LastDate, @Date)
		SET @DiffDate = DATEDIFF(DAY, @LastDate, @Date)

		FETCH NEXT FROM GetDifference INTO @LastDate
	END
	CLOSE GetDifference
	DEALLOCATE GetDifference

	--PRINT @DiffDate

	Return @DiffDate
END