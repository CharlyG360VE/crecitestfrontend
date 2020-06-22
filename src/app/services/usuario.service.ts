import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { throwError, Observable } from 'rxjs';
import { url } from '../config/url.config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = url;
  usuario: Usuario;
  token: string;

  constructor( private http: HttpClient, private router: Router ) {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    };
  };

  crearUsuario ( usuario: Usuario ) {
    return this.http.post( `${ this.url }/usuarios`, usuario )
      .pipe(
        map( resp => {
          Swal.fire(
            'Usuario registrado!',
            'Te has registrado exitosamente',
            'success'
          )
        } )
      )
  };

  iniciarSesion ( usuario: Usuario ) {

    return this.http.post( `${ this.url }/login`, usuario )
    .pipe( 
      map( resp => {
        this.token = resp['token'];
        localStorage.setItem( 'token', resp['token'] );
        localStorage.setItem( 'usuario', JSON.stringify(resp['usuario']) );
        localStorage.setItem( 'id', resp['usuario']._id )
        this.usuario = resp['usuario'];
        Swal.fire(
          'Bienvenido(a)',
          resp['usuario'].name,
          'success'
        )
        return resp['usuario'];
      } ),
      catchError( err => {
        Swal.fire(
          'Vuelva a intentar!!!',
          err.error.message,
          'error'
        );
        return throwError(err.message);
      } )
    ) 
  };

  getUsuarios () {
    return this.http.get( `${ this.url }/usuarios?token=${ this.token }` )
  }

  editRole ( role: string, id: string ) {
    return this.http.put( `${ this.url }/usuarios/${ id }?token=${ this.token }`, { role } )
      .pipe(
        map( resp => {
          Swal.fire(
            'Rol actualizado',
            'Se ha actualizado correctamente el rol de usuario',
            'success'
          )
        } )
      )
  }

  estaLogueado(){
    return ( this.token ) ? true: false;
  }

  logout() {

    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');

    Swal.fire(
      'Sesion cerrada!',
      'Sesion cerrada correctamente',
      'success'
    )

    this.router.navigate(['/login']);
  }

};
