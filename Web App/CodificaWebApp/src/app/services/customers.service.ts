import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerSalesPrediction } from '../models/customerSalesPrediction.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CustomersService {

  constructor(private http: HttpClient) {     
  }

  getSalesPredictionByCustomer() {
    return this.http.get<CustomerSalesPrediction[]>(`${environment.url_api}/api/Customers/GetSalesDatePrediction`);
  }

  getCustomerById(id: string) {
    return this.http.get(`${environment.url_api}/api/Customers/${id}`);
  }
}