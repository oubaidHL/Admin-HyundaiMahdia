import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = `${environment.api+'getcategory.php'+'?API_KEY='+environment.api_key}`;
  private baseUrlDelete = `${environment.api+'deleteCategory.php'+'?API_KEY='+environment.api_key}`;
  private baseUrlUpdate = `${environment.api+'updateCategory.php'+'?API_KEY='+environment.api_key}`;
  private baseUrlCreate = `${environment.api+'createCategory.php'+'?API_KEY='+environment.api_key}`;

  constructor(private http: HttpClient) { }

  getCategory(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl);
  }

  deleteCat(cat: Category): Observable<Response>{
    const url = this.baseUrlDelete+"&idCategory="+cat.idCategory;
    return this.http.delete<Response>(url);
  }

  
  addCat(cat: Category): Observable<Response>{
    let params = new FormData();
    params.append('name', cat.name);
    params.append('icon',cat.icon);

    return this.http.post<Response>(this.baseUrlCreate, params);

  }
  
  editCat(cat: Category): Observable<Response>{
    const url = this.baseUrlUpdate+this.constructURLParams(cat);
    return this.http.get<Response>(url);
  }

  
  constructURLParams = (object) => {
    let result = '';
    for (const property in object) {
        result += `&${property}=${object[property]}`;
    }
    return result;
  }

}
