import { Component, OnInit } from '@angular/core';
import { TokenService } from '../Service/token.service';


@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  isDocente?:boolean;
  editar:boolean = false;
  isLogged = false;
  roles: string[] = [];

  constructor(private tokenService:TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.roles = this.tokenService.getAuthorities();
      if(this.roles[0] == 'ROLE_DOCENTE'){
        this.isDocente = true;
      }else if(this.roles[0] == 'ROLE_ESTUDIANTE'){
        this.isDocente = false;
      }
    }
  }

  editarButton(){
    if(this.editar == true){
      this.editar = false;
    }else{
      this.editar = true;
    }    
  }
}
