export interface Order {
    orderid: number,
    custid: number,
    empid: number,
    orderdate: Date,
    requireddate: Date,
    shippeddate: Date,
    shipperid: number,
    freight: number,
    shipname: string,
    shipaddress: string,
    shipcity: string,
    shipregion: string,
    shippostalcode: string,
    shipcountry: string,
    cust: string,
    emp: string,
    shipper: string,
    orderDetails: string[]
}