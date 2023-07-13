import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { RegisteredListComponent } from './components/registered-list/registered-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { NgToastModule } from 'ng-angular-popup';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {CrearRutinaComponent} from "./components/crear-rutina/crear-rutina.component";
import {VerRutinasListComponent} from "./components/ver-rutinas/ver-rutinas-list.component";
import {VerMisRutinasListComponent} from "./components/ver-mis-rutinas/ver-mis-rutinas-list.component";
import {CronometroComponent} from "./components/cronometro/cronometro.component";
import {AdminLayoutComponent} from "./components/adminlayout/adminlayout.component";
import {UserLayoutComponent} from "./components/userlayout/userlayout.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {ToastrModule} from "ngx-toastr";
import {VerMisTiemposListComponent} from "./components/ver-mis-tiempos/ver-mis-tiempos-list.component";
import {VerTiemposListComponent} from "./components/ver-tiempos/ver-mis-tiempos-list.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ModificarProgresoComponent} from "./components/modificar-progreso/modificar-progreso.component";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RegisteredListComponent,
    CrearRutinaComponent,
    UserDetailComponent,
    LayoutComponent,
    LoginComponent,
    CronometroComponent,
    VerMisTiemposListComponent,
    ModificarProgresoComponent,
    VerTiemposListComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    VerRutinasListComponent,
    VerMisRutinasListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    NgToastModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router) {}
  ngAfterViewInit() {
    this.router.navigate(['']);
  }
}
