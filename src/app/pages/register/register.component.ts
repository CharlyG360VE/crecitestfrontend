import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  usuario: Usuario;

  constructor( 
                private usuarioSvc: UsuarioService,
                private router: Router
             ) { }

  ngOnInit(): void {
  }

  registro( f: NgForm ) {
    this.usuario = {
      name: f.value.name,
      email: f.value.email,
      password: f.value.password
    };
    this.usuarioSvc.crearUsuario( this.usuario )
      .subscribe( resp => this.router.navigate(['login']) )
  }

}
