import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';
import { ProyectoTareaService } from '../../services/proyecto-tarea.service';
import { ProyectoTarea } from 'src/app/models/proyectoTarea.models';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css']
})
export class AsignarComponent implements OnInit {

  tipo: string;
  devId: string;
  id: string;
  value: number = 0;
  bool: boolean = true;
  devSeleccionado: any = {};
  proyectoTareaSeleccionado: any = {}
  usuarios: Usuario[] = [];
  proyectos: ProyectoTarea[] = [];
  tareas: ProyectoTarea[] = []

  tipos: any[] = [
    {value: 'proyectos', viewValue: 'Proyecto'},
    {value: 'tareas', viewValue: 'Tarea'}
  ];

  constructor( private usuarioSvc: UsuarioService, private proyectoTareaSvc: ProyectoTareaService ) {
    this.getUsuarios();
    this.gettareas();
    this.getProyectos();
  }

  ngOnInit(): void {
  }

  getUsuarios () {
    this.usuarioSvc.getUsuarios()
      .subscribe( resp => {
        this.usuarios = resp['usuarios']
        this.bool = false;
      } )
  }

  getdevId ( devId: string, name: string ) {
    this.devId = devId;
    this.value++;
    this.devSeleccionado.name = name;
    this.devSeleccionado.devId = devId;
    if ( name ) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${ name } seleccionado`,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  getId ( id: string, name: string ) {
    this.id = id;
    this.value++;
    this.proyectoTareaSeleccionado.name = name;
    this.proyectoTareaSeleccionado.id = id;
    if ( name ) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${ name } seleccionado`,
        showConfirmButton: false,
        timer: 1500
      })
    };
  }

  getProyectos () {
    this.proyectoTareaSvc.getProyectoTarea( 'proyectos' )
      .subscribe( resp => this.proyectos = resp['proyectos'] )
  }

  gettareas () {
    this.proyectoTareaSvc.getProyectoTarea( 'tareas' )
      .subscribe( resp => this.tareas = resp['tareas'] )
  }

  asignarProyecto( f: NgForm ) {
    if ( this.devId && this.id ) {
      this.proyectoTareaSvc.asignarProyectoTarea( this.tipo, this.devId, this.id )
        .subscribe( resp => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${ this.tipo } asignado(a)s correctamente`,
            showConfirmButton: false,
            timer: 1500
          })
          this.tipo = '';
          this.devId = '';
          this.id = '';
          this.value = 0;
        } )
    }
  }

  close () {
    this.tipo = '';
    this.devId = '';
    this.id = '';
    this.value = 0;
  }

}
