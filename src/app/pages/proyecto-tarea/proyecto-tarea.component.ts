import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProyectoTareaService } from '../../services/proyecto-tarea.service';


@Component({
  selector: 'app-proyecto-tarea',
  templateUrl: './proyecto-tarea.component.html',
  styleUrls: ['./proyecto-tarea.component.css']
})
export class ProyectoTareaComponent implements OnInit {

  tipo: string;
  bool: boolean = true;

  tipos: any[] = [
    {value: 'proyectos', viewValue: 'Proyecto'},
    {value: 'tareas', viewValue: 'Tarea'}
  ];

  constructor( private ptSvc: ProyectoTareaService ) { }

  ngOnInit(): void {
    this.bool = false;
  }

  crearProyecto( f: NgForm ) {
    this.ptSvc.crearProyectoTarea( f.value.tipo, f.value.name )
      .subscribe()
  }

}
