export interface CustomerSalesPrediction {
    custid: number,
    customerName: string,
    lastOrderDate: Date,
    nextPredictedOrder: Date
}