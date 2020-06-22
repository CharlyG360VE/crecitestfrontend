import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import Swal from 'sweetalert2'
import { throwError } from 'rxjs';
import { url } from '../config/url.config';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  url: string = url;
  token: string;
  id: string;

  constructor( private http: HttpClient ) {
    this.token = localStorage.getItem( 'token' );
    this.id = localStorage.getItem( 'id' );
  };

  getReporte ( ) {
    return this.http.get( `${ this.url }/estado/${ this.id }?token=${ this.token }` )
      .pipe( map( (resp: any) => {
        return resp.estado[0];
      } ) )
  };

  editarHora ( horas: number ) {
    return this.http.put( `${ this.url }/estado/${ this.id }?token=${ this.token }`, { horas } )
    .pipe(
      map( resp => {
        Swal.fire(
          'Hora actualizada',
          'Se han actualizado correctamente las horas de trabajo',
          'success'
        )
        return resp;
      } ),
      catchError( err => {
        Swal.fire(
          'Error al iniciar sesion',
          err.error.message,
          'error'
        );
        return throwError(err.message);
      } )
    )
  }

};
