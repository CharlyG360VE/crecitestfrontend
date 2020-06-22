import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoTareaComponent } from './proyecto-tarea/proyecto-tarea.component';
import { AsignarComponent } from './asignar/asignar.component';
import { ReporteComponent } from './reporte/reporte.component';
import { DevelopersComponent } from './developers/developers.component';
import { PagesComponent } from './pages.component';
import { SidenavListComponent } from '../components/sidenav-list/sidenav-list.component';
//navbar
import { NavbarComponent } from '../components/navbar/navbar.component';
//Routing Module
import { PAGES_ROUTES } from './pages-routing.module';
//Material Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    ProyectoTareaComponent, 
    AsignarComponent, 
    ReporteComponent, 
    DevelopersComponent, 
    PagesComponent,
    NavbarComponent,
    SidenavListComponent
  ],
  exports: [
    ProyectoTareaComponent, 
    AsignarComponent, 
    ReporteComponent, 
    DevelopersComponent, 
    PagesComponent,
    NavbarComponent,
    SidenavListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    PAGES_ROUTES,
  ]
})
export class PagesModule { }
