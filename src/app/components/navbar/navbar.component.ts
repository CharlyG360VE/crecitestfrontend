import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  adminBool: boolean;

  @Output() public sidenavToggle = new EventEmitter();

  constructor( private usuarioSvc: UsuarioService ) {
    if ( this.usuarioSvc.usuario.role === 'ADMIN_ROLE' ){
      this.adminBool = true;
    };
  };

  ngOnInit(): void {
  };

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  logout () {
    this.usuarioSvc.logout();
  };

};
