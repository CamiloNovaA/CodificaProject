CREATE PROCEDURE SPSalesDatePrediction
AS
BEGIN
	SELECT 
		SC.custid,
		SC.companyname 'CustomerName',
		MAX(SO.orderdate) 'LastOrderDate',
		MAX(SO.orderdate) + ROUND(dbo.GetPredictedOrder(SC.custid) / COUNT(SO.orderdate), 0) 'NextPredictedOrder'
	FROM 
		Sales.Customers SC
	INNER JOIN Sales.Orders SO ON SC.custid = SO.custid
	GROUP BY SC.companyname, SC.custid
END