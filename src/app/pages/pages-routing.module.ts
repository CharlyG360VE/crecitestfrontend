import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DevelopersComponent } from './developers/developers.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ProyectoTareaComponent } from './proyecto-tarea/proyecto-tarea.component';
import { AsignarComponent } from './asignar/asignar.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: 'dashboard', component: DevelopersComponent, canActivate: [AdminGuard] },
      { path: 'reporte', component: ReporteComponent },
      { path: 'crear', component: ProyectoTareaComponent, canActivate: [AdminGuard] },
      { path: 'asignar', component: AsignarComponent, canActivate: [AdminGuard] },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild( routes );