import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';
import { Orders } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = `${environment.api+'getOrders.php'+'?API_KEY='+environment.api_key}`;
  private baseUrlUpdate = `${environment.api+'updateOrders.php'+'?API_KEY='+environment.api_key}`;
  private baseUrlCreate = `${environment.api+'createOrders.php'+'?API_KEY='+environment.api_key}`;
  private baseUrlDelete = `${environment.api+'deleteOrders.php'+'?API_KEY='+environment.api_key}`;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl);
  }

  addOrder(order: Orders): Observable<Response>{
    let params = new FormData();
    params.append('idOrder', `${order.idOrder}`);
    params.append('idUser', `${order.idUser}`);
    params.append('idProduct', `${order.idProduct}`);
    params.append('quantity',`${order.quantity}`);
    params.append('price', `${order.price}`);
    params.append('createdAt', `${order.createdAt}`);

    return this.http.post<Response>(this.baseUrlCreate, params);

  }

  editOrder(order: Orders): Observable<Response>{
    let params = new FormData();
    params.append('idOrder', `34`);
    params.append('status', `${order.status}`);
    return this.http.post<Response>(this.baseUrlUpdate, params);
  }

  deleteOrder(order: Orders): Observable<Response>{
    const url = this.baseUrlDelete+"&idOrder="+order.idOrder;
    return this.http.delete<Response>(url);
  }




  constructURLParams = (object) => {
    let result = '';
    for (const property in object) {
        result += `&${property}=${object[property]}`;
    }
    return result;
  }

}
