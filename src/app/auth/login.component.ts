import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../Modelo/usuario';
import { AuthService } from '../Service/auth.service';
import { TokenService } from '../Service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: Usuario = new Usuario();
  nombreUsuario: string = '';
  password: string = '';
  roles: string[] = [];
  errMsj: string = '';

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario.nombreUsuario = this.nombreUsuario;
    this.loginUsuario.contrasenia = this.password;
    this.authService.login(this.loginUsuario).subscribe(data => {
      this.isLogged = true;
      this.isLoginFail = false;

      this.tokenService.setToken(data.token);
      this.tokenService.setUsertName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate(["/index"]);
    }, err => {
      this.isLogged = false;
      this.isLoginFail = true;
      this.errMsj = err.error;
      console.log(err);
      console.log(this.errMsj);
    });
  }

}
