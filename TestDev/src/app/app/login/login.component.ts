import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  public user = {
    email: "",
    password: ""
  };

  public errorLogin = false;

  ngOnInit() {}

  onLoginApi(): void {
    this.authService.loginUser(this.user.email,this.user.password)
    .subscribe(user => {
      this.authService.setAuthUser(user);
      let token = user.token;
      this.authService.setAuthToken(token);
      this.router.navigate(['/perfil']);
    },(error) => {
      this.errorLogin = true;
    });
  }

}
