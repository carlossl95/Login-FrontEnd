import { IAddress } from './Address.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class AddressService{
    private api: string = "https://brasilapi.com.br/api/cep/v1/";

    constructor (private httpClient: HttpClient){}

    public SearchCep(cep: String): Observable<IAddress> {
        return this.httpClient.get(`${this.api}`+cep);
    }

}