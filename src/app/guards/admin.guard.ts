import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor ( private usuarioSvc: UsuarioService, private router: Router ) {};

  canActivate(){
    if ( this.usuarioSvc.usuario.role === "ADMIN_ROLE" ) {
      return true;
    } else {
      this.router.navigate(['/reporte'])
      return false;
    }
  }
  
}
