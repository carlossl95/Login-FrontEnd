import { DataComponent } from './Featurs/Client/data/data.component';
import { LoginComponent } from './Featurs/Login/login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './Featurs/Client/cadastro/cadastro.component';

const routes: Routes = [
  {
    path: 'Login',
    children:[
      {
        path: 'login',
        component: LoginComponent,
      }
    ]
  },
  {
    path: '',
    redirectTo: 'Login/login',
    pathMatch: 'full'
  },
  {
    path: 'Client',
    children: [
      {
        path: 'cadastro',
        component: CadastroComponent,
      },
      {
        path: 'data/:id',
        component: DataComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { };