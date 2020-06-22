import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import Swal from 'sweetalert2'
import { map } from 'rxjs/operators';
import { url } from '../config/url.config';

@Injectable({
  providedIn: 'root'
})
export class ProyectoTareaService {

  url: string = url;
  token: string;

  constructor( private http: HttpClient ) {
    this.token = localStorage.getItem('token');
  }

  getProyectoTarea ( tipo: string ) {
    return this.http.get( `${ this.url }/${ tipo }?token=${ this.token }` )
  }

  crearProyectoTarea ( tipo: string, name: string ) {
    if ( this.token.length !== 0 ) {
      return this.http.post( `${ this.url }/${ tipo }?token=${ this.token }`, { name } )
      .pipe(
        map( resp => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha guardado "${ name }" correctamente`,
            showConfirmButton: false,
            timer: 1500
          })
          return resp;
        } )
      );
    };
  };

  asignarProyectoTarea ( tipo: string, devId: string, id: string ) {
    return this.http.put( `${ this.url }/${ tipo }/asignar/${ id }?token=${ this.token }`, { devId } )
  }
}
