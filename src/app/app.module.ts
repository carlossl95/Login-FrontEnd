import { DataComponent } from './Featurs/Client/data/data.component';
import { ClientService } from './Featurs/Client/client.Service';
import { CadastroComponent } from './Featurs/Client/cadastro/cadastro.component';
import { LoginService } from './Featurs/Login/login.Service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Featurs/Login/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddressService } from './Featurs/Endereco/address.Service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    DataComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [LoginService, ClientService, AddressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
