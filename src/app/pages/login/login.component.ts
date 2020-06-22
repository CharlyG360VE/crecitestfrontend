import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  usuario: Usuario;

  constructor(
                private usuarioSvc: UsuarioService,
                private router: Router
             ) { }

  ngOnInit(): void {
  }

  ingresar ( f: NgForm ) {
    this.usuario = {
      email: f.value.email,
      password: f.value.password,
    };

    this.usuarioSvc.iniciarSesion( this.usuario )
      .subscribe( resp => {
        this.usuario =  resp;
        this.router.navigate(['dashboard'])
      } )
  }

}
