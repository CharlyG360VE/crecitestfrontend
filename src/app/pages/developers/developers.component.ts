import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {

  usuarios: Usuario[] = [];
  bool: boolean = true;

  roles: any[] = [
    {value: 'ADMIN_ROLE', viewValue: 'Admin'},
    {value: 'DEV_ROLE', viewValue: 'Dev'}
  ]

  constructor( private usuarioSvc: UsuarioService ) {
    this.getUsuarios();
  }

  ngOnInit(): void {
  }

  getUsuarios () {
    this.usuarioSvc.getUsuarios()
      .subscribe( resp => {
        this.usuarios = resp['usuarios']
        this.bool = false;
      } );
  }

  editRole( role: string, id: string ) {
    this.usuarioSvc.editRole( role, id )
      .subscribe( resp => this.getUsuarios() );
  }

}
