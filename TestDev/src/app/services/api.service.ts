import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from './auth.service';
import { map } from 'rxjs/operators';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user: Observable<any> | undefined;

  constructor(private http: HttpClient, private authService: AuthService) { }

  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  headerFile :  HttpHeaders = new HttpHeaders({
    Authorization: this.authService.getAuthToken()
  })


  secureHeaders : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: this.authService.getAuthToken()
  });


  getPingApi(){
    const pingEp = 'https://candidates-exam.herokuapp.com/api/v1/ping';
    return this.http.get(pingEp,{headers: this.headers});
  }


  registrarCandidato(candidato: any){
    const registroEp = 'https://candidates-exam.herokuapp.com/api/v1/usuarios';
    return this.http.post(registroEp,candidato,{headers: this.headers})
    .pipe(map(data => data));
  }

  getPerfil(){
    const perfilEp = 'https://candidates-exam.herokuapp.com/api/v1/usuarios/';
    return this.user = this.http.get(perfilEp,{headers: this.secureHeaders});
  }

  loadFile(File: FormData): any{
    const jsonUrl = this.authService.getUserOn();
    const url = jsonUrl.url;
    const loadFileEp = 'https://candidates-exam.herokuapp.com/api/v1/usuarios/'+url+'/cargar_cv';
    return this.http.post(loadFileEp,File,{headers:this.headerFile})
    .pipe(map(data => data));
    
  }
}
