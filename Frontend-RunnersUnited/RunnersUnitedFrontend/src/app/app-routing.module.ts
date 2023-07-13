import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RegisteredListComponent } from './components/registered-list/registered-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import {LoginComponent} from './components/login/login.component'
import {CrearRutinaComponent} from "./components/crear-rutina/crear-rutina.component";
import {VerRutinasListComponent} from "./components/ver-rutinas/ver-rutinas-list.component";
import {VerMisRutinasListComponent} from "./components/ver-mis-rutinas/ver-mis-rutinas-list.component";
import {CronometroComponent} from "./components/cronometro/cronometro.component";
import {AdminLayoutComponent} from "./components/adminlayout/adminlayout.component";
import {UserLayoutComponent} from "./components/userlayout/userlayout.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {VerMisTiemposListComponent} from "./components/ver-mis-tiempos/ver-mis-tiempos-list.component";
import {VerTiemposListComponent} from "./components/ver-tiempos/ver-mis-tiempos-list.component";
import {ModificarProgresoComponent} from "./components/modificar-progreso/modificar-progreso.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      }
      ]
  },
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'detail/:id',
        component: UserDetailComponent
      },
      {
        path: 'detail/mis-rutinas/:id',
        component: VerMisRutinasListComponent
      },
      {
        path: 'detail/modificar-progreso/:id',
        component: ModificarProgresoComponent
      },
      {
        path: 'detail/mis-tiempos/:id',
        component: VerMisTiemposListComponent
      },
      {
        path: 'detail/register-tiempo/:id',
        component: CronometroComponent
      },
      {
        path: 'update/:id',
        component: RegisterComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'list',
        component: RegisteredListComponent
      },
      {
        path: 'crear-rutina/:id',
        component: CrearRutinaComponent
      },
      {
        path: 'ver-rutinas/:id',
        component: VerRutinasListComponent
      },
      {
        path: 'ver-tiempos/:id',
        component: VerTiemposListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

