import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  headers : HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  });

  registerUser(nombre: string, email: string, password: string, password_confirmation: string){
    const epRegisterUser = "https://candidates-exam.herokuapp.com/api/v1/ping";
    return this.http.post(epRegisterUser, {
      nombre: nombre, 
      email: email, 
      password: password, 
      password_confirmation: password_confirmation
    }, {headers : this.headers})
    .pipe(map(data => data));
  }

  loginUser(email: string, password: string): Observable<any>{
    const epLoginuser = "https://candidates-exam.herokuapp.com/api/v1/auth/login";
    return this.http.post(epLoginuser,{
      email: email,
      password: password
    },{headers: this.headers})
    .pipe(map(data => data));
  }

  setAuthUser(user: any): void{
    let userOn = JSON.stringify(user);
    localStorage.setItem('sessionUser',userOn);

  }

  setAuthToken(token: string): void{
    localStorage.setItem("accessToken",token);
  }

  getAuthToken() : string{
    const token = localStorage.getItem("accessToken");
    return token !== null ? String(token) : String("null");
  }

  getUserOn(){
    let userOn = localStorage.getItem("sessionUser");
    if(userOn !== null && userOn !== undefined){
      let user = JSON.parse(userOn);
      return user;
    }else{
      return null;
    }
  }

  
}
