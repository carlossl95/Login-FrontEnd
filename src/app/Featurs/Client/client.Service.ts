import { catchError } from 'rxjs/operators';
import { Observable, ObservableInput } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { IClient } from "./client.module";

@Injectable()
export class ClientService{
  
    private api: String = "http://localhost:5187"

    constructor(private httpClient: HttpClient ) {}

  public NewClient(newClient: IClient): Observable<object> {
    return this.httpClient.post<IClient>(`${this.api}/client`, newClient);
  }

  SearchDataClient(id: number): Observable<IClient> {
    return this.httpClient.get<IClient>(`${this.api}/client/ID/`+id)
  }

  EditPassword(id: number, currentPassword: String, newPassword: String): Observable<object>{
    return this.httpClient.head<object>(`${this.api}/client/id/`+id+`/currentPassword/`+currentPassword+`/newPassword/`+newPassword)
  }

  DeletClient(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.api}/client/`+id);
  }

  UpdateDiceClient(UpdateDiceClient: IClient): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.api}/client`,UpdateDiceClient)
  }

}