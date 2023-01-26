import { IClient } from './../../Client/client.module';
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { take } from "rxjs";
import { ILogin } from "../login.Module";
import { LoginService } from "../login.Service";
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public form!: FormGroup;
  public id!: number

  constructor(private _loginService: LoginService, private _router: Router) { }

  ngOnInit(): void {

    this.form! = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  Cadastrar(){
    
  }

  Entrar() {
    if (this.form.valid) {
      const loginClient: ILogin =
      {
        email: this.form.value.email.toLowerCase(),
        password: this.form.value.password
      }

      this._loginService.LoginClient(loginClient)
        .pipe(take(1))
        .subscribe(
          (data: number) => {
            this.id = data
            this._router.navigate(['Client/data', this.id])
          },
          (status: HttpErrorResponse) => {
            alert(`${status.error.mensagem}`)
          }
        )
    }
    else
      alert("Email e senha são Obrigatórios")
  }
}
