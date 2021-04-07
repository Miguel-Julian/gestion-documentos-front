import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../Service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  imgInicio: string = 'assets/Bienvenida.jpg';
  isLogged = false;
  roles: string[] = [];
  constructor(private tokenService: TokenService,private router:Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.roles = this.tokenService.getAuthorities();
    }else{
      this.isLogged = false;
      this.roles = [];
    }
  }
  onLogOut(): void {
    this.tokenService.logOut();    
    window.location.reload();
  }
}
