import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioSvc: UsuarioService,
               private router: Router ){}

  canActivate(){
    if(  this.usuarioSvc.estaLogueado() ){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    };
  };
};
