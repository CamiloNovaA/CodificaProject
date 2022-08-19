import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employees } from '../models/employees.model';
import { Shippers } from '../models/shippers.model';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UtilitiesService {

  constructor(private http: HttpClient) {     
  }
    
  getEmployees() {
    return this.http.get<Employees[]>(`${environment.url_api}/api/Employees`);
  }
    
  getShippers() {
    return this.http.get<Shippers[]>(`${environment.url_api}/api/Shippers`);
  }
    
  getProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/api/Products`);
  }
}