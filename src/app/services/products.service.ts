import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';
import { Product } from '../models/product';
import { Orders } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = `${environment.api+'getproducts.php'+'?API_KEY='+environment.api_key}`;
  private baseUrlUpdate = `${environment.api+'updateProducts.php'+'?API_KEY='+environment.api_key}`;
  private baseUrlCreate = `${environment.api+'createProducts.php'+'?API_KEY='+environment.api_key}`;
  private baseUrlDelete = `${environment.api+'deleteProducts.php'+'?API_KEY='+environment.api_key}`;
  private baseUrlGetProduct = `${environment.api+'getProductById.php'+'?API_KEY='+environment.api_key}`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl);
  }
  getProdcutsById(order){
    return this.http.get<Response>(this.baseUrlGetProduct+"&idProduct="+order.idProduct);
  }

  addProduct(product: Product): Observable<Response>{
    let params = new FormData();
    params.append('name', product.name);
    params.append('description',product.description);
    params.append('price',`${product.price}`);
    params.append('stock',`${product.stock}`);
    params.append('idCategory',`${product.idCategory}`);
    params.append('image',product.image);

    return this.http.post<Response>(this.baseUrlCreate, params);

  }

  editProduct(product: Product): Observable<Response>{
    const url = this.baseUrlUpdate+this.constructURLParams(product);
    return this.http.get<Response>(url);
  }

  deleteProduct(product: Product): Observable<Response>{
    const url = this.baseUrlDelete+"&idProduct="+product.idProduct;
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
