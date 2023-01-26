import { IClient } from './../Client/client.module';
import { ILogin } from './login.Module';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable()
export class LoginService{


  private api: string = 'http://localhost:5187/client'

  constructor(private httpClient: HttpClient) { }

  public LoginClient(loginClient: ILogin): Observable<number> {
    return this.httpClient.post<number>(`${this.api}/login/`,loginClient)
  }

}