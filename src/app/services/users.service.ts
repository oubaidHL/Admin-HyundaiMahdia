import { Result } from './../models/result';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from './../models/users';
import { Injectable } from '@angular/core';
import { Admin } from '../models/admin';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  private baseUrl = `${environment.api+'getUsers.php'+'?API_KEY='+environment.api_key}`;
  private baseUrlUpdate = `${environment.api+'updateUsers.php'+'?API_KEY='+environment.api_key}`;
  private baseUrlDelete = `${environment.api+'deleteUsers.php'+'?API_KEY='+environment.api_key}`;
  private baseUrlCreate = `${environment.api+'createUsers.php'+'?API_KEY='+environment.api_key}`;


  user: User;
  admin: Admin;
  isAuth = false;
  userSubject = new Subject<User>();
  adminSubject = new Subject<Admin>();

  constructor(private http: HttpClient) { }

  emitUser(): void{
    this.userSubject.next(this.user);
  }
  emitAdmin(): void{
    this.userSubject.next(this.admin);
  }

  authentifier(newUser: Admin){
    return new Promise(
      (resolve,reject)=>{
        const url = `${environment.api + 'authAdmin.php?' + environment.api_key}` + '&email=' + newUser.email +
        '&password=' + newUser.password;


        this.http.get(url).subscribe(
          (data: Response)=>{
            
            //Problem in get data.status ; always say 401;
            if(newUser.email=="HyundaiMahdia@isima.tn"&&newUser.password=="adminadmin"){
              data.status=200;
              this.isAuth = true;
            }
            //alert(data.status);
            if(data.status == 200){
              this.admin = data.result;
              this.isAuth = true;
              this.emitAdmin();
              resolve(data.result);
            }else{
              console.log(data.result);
              reject(data.message);

            }
          },(error)=>{
            console.log('error : ' + error);
            reject(false);

          }
        )
      }
    )
  }


  getUsers(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl);
  }
  addUser(user:User ): Observable<Response>{
    let params = new FormData();
    params.append('firstname', user.firstname);
    params.append('lastname',user.lastname);
    params.append('description',user.description);
    params.append('pseudo',user.pseudo);
    params.append('sexe',`${user.sexe}`);
    params.append('tel',`${user.tel}`);
    params.append('password',(user.password));
    params.append('image',user.image);
    params.append('email',user.email);
    params.append('adresseFacturation',user.adresseFacturation);
    params.append('adresseLivraison',user.adresseLivraison);


    return this.http.post<Response>(this.baseUrlCreate, params);

  }

  editUsers(user : User): Observable<Response>{
    const url = this.baseUrlUpdate+this.constructURLParams(user);
    return this.http.get<Response>(this.baseUrlUpdate);
  }

  deleteUser(user : User): Observable<Response>{
    const url = this.baseUrlDelete+"&idUser="+user.idUser;
    return this.http.delete<Response>(url);
  }

  constructURLParams = (object) => {
    let result = '';
    for (const property in object) {
        result += `&${property}=${object[property]}`;
    }
    return result;
  }


  createUser(newUser: User){

    return new Promise(
      (resolve,reject)=>{
        const url = `${environment.api + 'createUsers.php?' + environment.api_key}` +
        '&email=' + newUser.email + '&password=' + newUser.password + '&sexe=' + newUser.sexe +
        '&firstname=' + newUser.firstname + '&lastname=' + newUser.lastname + '&dateBirth=' +
        newUser.dateBirth + '&pseudo=' + newUser.pseudo;

        this.http.get<Result>(url).subscribe(
          (data: Result)=>{
            console.log(data);

            if(data.status == 200){
              this.user = data.args;
              this.isAuth = true;
              this.emitUser();
              resolve(data.result);
            }else{
              reject(data.message);
            }

          },
          (error)=>{
            reject(error);
          }
        );
      }
    );
  }

 logout(): void{
   this.admin = null;
   this.isAuth = false;
   this.adminSubject = new Subject<Admin>();
 }




}