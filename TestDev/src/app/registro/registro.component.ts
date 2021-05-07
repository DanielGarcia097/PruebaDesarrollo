import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  public user = {
    nombre: "",
    email: "",
    password: "",
    password_confirmation : ""
  };

  ngOnInit() {}

  onRegistroApi(): void {
    this.apiService.registrarCandidato(this.user)
    .subscribe(user => {
      this.router.navigate(['']);
    });
  }

}
