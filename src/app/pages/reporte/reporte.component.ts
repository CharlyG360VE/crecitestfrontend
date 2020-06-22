import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReportesService } from '../../services/reportes.service';
import { Usuario } from 'src/app/models/usuario.models';
import { ProyectoTarea } from '../../models/proyectoTarea.models';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  tipo: string;
  name: string;
  usuario: Usuario;
  proyectos: ProyectoTarea[] = [];
  tareas: ProyectoTarea[] = [];
  fecha: Date = new Date();
  horas: number = 0;
  fechaReportes: Date;
  bool: boolean = true;

  tipos: any[] = [
    {value: 'proyectos', viewValue: 'Proyecto'},
    {value: 'tareas', viewValue: 'Tarea'}
  ];


  constructor( private reporteSvc: ReportesService ) {
    this.getReporte();
  }

  ngOnInit(): void {
    
  }

  getReporte () {
    this.reporteSvc.getReporte()
      .subscribe( (resp: any) => {
        this.usuario = resp.devId;
        this.name = resp.devId.name;
        this.proyectos = resp.proyecto;
        this.tareas = resp.tarea;
        this.horas = resp.horas;
        this.fechaReportes = resp.fecha;
        this.bool = false;
      } )
  }

  actualizar( f: NgForm ) {
    this.reporteSvc.editarHora( f.value.horas )
      .subscribe( (resp: any) => {
        this.horas = resp.estado.horas;
        this.fechaReportes = resp.estado.fecha;
      } )
  }

}
