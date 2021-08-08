import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = `${environment.api+'createImage.php'+'?API_KEY='+environment.api_key}`;
  private baseUrluser = `${environment.api+'createImageUser.php'+'?API_KEY='+environment.api_key}`;
  private baseUrldelete = `${environment.api+'deleteImage.php'+'?API_KEY='+environment.api_key}`;
  private baseUrldeleteuser = `${environment.api+'deleteImageuser.php'+'?API_KEY='+environment.api_key}`;


  constructor(private http: HttpClient) { }

  uploadImage(file: File):Observable<any>{
    let formData: any = new FormData();
    formData.append("image", file);

    return this.http.post(this.baseUrl, formData,{
      reportProgress: true,
      observe: 'events'
    })
  }
  uploadImageUser(file: File):Observable<any>{
    let formData: any = new FormData();
    formData.append("image", file);

    return this.http.post(this.baseUrluser, formData,{
      reportProgress: true,
      observe: 'events'
    })
  }

  deleteImage(name: string): Observable<any>{
    const url = this.baseUrldelete+"&name="+name;
    return this.http.delete(url);
  }
  deleteImageUser(name: string): Observable<any>{
    const url = this.baseUrldeleteuser+"&name="+name;
    return this.http.delete(url);
  }


}
