import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { environment } from 'src/environments/environment';
import { newOrder } from '../models/newOrder.model';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  constructor(private http: HttpClient) {     
  }

  getOrdersByClientId(id: Number) {
    return this.http.get<Order[]>(`${environment.url_api}/api/Orders/GetOrdersByClient/${id}`);
  }

  createOrder(newOrder: newOrder) {
    return this.http.post(`${environment.url_api}/api/Orders`, newOrder);
  }
}