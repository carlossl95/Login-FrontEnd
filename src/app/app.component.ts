import { LoginService } from './Featurs/Login/login.Service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private loginservice: LoginService){
    
  }
}
