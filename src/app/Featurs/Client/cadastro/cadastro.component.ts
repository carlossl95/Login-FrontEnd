import { IAddress } from './../../Endereco/Address.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ClientService } from '../client.Service';
import { IClient } from '../client.module';
import { take } from 'rxjs/operators';
import { AddressService } from '../../Endereco/address.Service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public form!: FormGroup

  public address!: IAddress
  constructor(private _clientService: ClientService, private _addressService: AddressService) {

  }


  ngOnInit(): void {
    this.form = new FormGroup
      ({
        name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
        email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(50)]),
        phone: new FormControl(null, [Validators.required, Validators.minLength(15), Validators.maxLength(15)]),
        cpf: new FormControl(null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
        birthDate: new FormControl(null, [Validators.required]),
        sex: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
        maritalStatus: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
        cep: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
        city: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        neighborhood: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        state: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
        street: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
        number: new FormControl(null, [Validators.required, Validators.maxLength(5)]),
        complementAddress: new FormControl(null, Validators.maxLength(50)),
        password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
        confirmPassword: new FormControl(null, [Validators.required]),
        confirmEmail: new FormControl(null, [Validators.required])
      })
  }

  SearchCep() {
    this._addressService.SearchCep(this.form.value.cep.replace(/[^0-9]/g, ''))
      .pipe(take(1))
      .subscribe(
        (Dice: IAddress) => {
          this.address = Dice;
          this.form.patchValue({
            state: this.address.state,
            city: this.address.city,
            neighborhood: this.address.neighborhood,
            street: this.address.street
          })
        },
        (status: HttpErrorResponse) => {
          alert(`${status.error.message} Revise o Cep!`)
        }
      )
  }

  Salvar() {   

    if (this.form.valid && this.ValidPasswordAndEmail() === true) {
      const newClient: IClient = {
        name: this.form.value.name,
        cpf: this.form.value.cpf.replace(/[^0-9]/g, ''),
        phone: this.form.value.phone.replace(/[^0-9]/g, ''),
        birthDate: this.form.value.birthDate,
        sex: this.form.value.sex,
        maritalStatus: this.form.value.maritalStatus,
        cep: this.form.value.cep.replace(/[^0-9]/g, ''),
        city: this.form.value.city,
        state: this.form.value.state,
        neighborhood: this.form.value.neighborhood,
        street: this.form.value.street,
        number: this.form.value.number,
        complement: this.form.value.complementAddress,
        email: this.form.value.email.toLowerCase(),
        password: this.form.value.password
      }
      this._clientService.NewClient(newClient)
        .pipe(take(1))
        .subscribe(
          (valid: IClient) => {
            alert(`${valid.email} Registrado com Sucesso!`)
            window.location.assign('http://localhost:4200')
          },
          (status: HttpErrorResponse) => {
            alert(`${status.error.mensagem}`)
          }
        )
    }
  }

  ValidPasswordAndEmail() {
    const password = this.form.value.password
    const confirmPassword = this.form.value.confirmPassword
    const email = this.form.value.email
    const confirmEmail = this.form.value.confirmEmail

    if (password != confirmPassword) {
      alert('Senha e Confirmar Senha devem ser iguais')
      return false
    }
    if (email != confirmEmail){
      alert('Email e Confirmar Email devem ser iguais')
      return false
    }
    return true
  }
}