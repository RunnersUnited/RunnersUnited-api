import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RegisteredListComponent } from './components/registered-list/registered-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import {LoginComponent} from './components/login/login.component'
import {LayoutComponent} from "./components/layout/layout.component";

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin/list',
        component: RegisteredListComponent,
      }/*,
      {
        path: 'productos/:id/edit',
        component: EditProductoComponent,
      },
      {
        path: 'categorias',
        component: CategoriaListComponent,
      },
      {
        path: 'categorias/new',
        component: NewCategoriaComponent,
      },
      {
        path: 'compras',
        component: CompraListComponent,
      },*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
