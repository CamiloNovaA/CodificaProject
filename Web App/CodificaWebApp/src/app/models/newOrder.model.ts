export interface newOrder {
    custid: number,
    employeeId: number,
    shipperId: number,
    shipName: string,
    shipAddress: string,
    shipCity: string,
    shipCountry: string,
    orderDate: Date,
    requiredDate: Date,
    shippedDate: Date,
    freight: number,
    productId: number,
    unitPrice: number,
    quantity: number,
    discount: number
}