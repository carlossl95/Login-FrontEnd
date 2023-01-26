import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { IClient } from './../client.module';
import { take, pipe } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from './../client.Service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { from } from 'rxjs';
import { AddressService } from '../../Endereco/address.Service';
import { IAddress } from '../../Endereco/Address.model';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  formPassword!: FormGroup
  formDice!: FormGroup

  private id!: number;

  public client!: IClient;
  public address!: IAddress;

  constructor(private _clientService: ClientService, private _route: ActivatedRoute, private _addressService: AddressService) { }


  ngOnInit(): void {

    this.formDice = new FormGroup({
      name: new FormControl([Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
      phone: new FormControl([Validators.required, Validators.minLength(15), Validators.maxLength(15)]),
      cpf: new FormControl([Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
      birthDate: new FormControl([Validators.required]),
      sex: new FormControl([Validators.required, Validators.maxLength(25)]),
      maritalStatus: new FormControl([Validators.required, Validators.maxLength(25)]),
      cep: new FormControl([Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      city: new FormControl([Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      neighborhood: new FormControl([Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      state: new FormControl([Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      street: new FormControl([Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
      number: new FormControl([Validators.required, Validators.maxLength(5)]),
      complementAddress: new FormControl([Validators.required, Validators.maxLength(50)]),
    })

    this.formPassword = new FormGroup({
      currentPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      confirmPassword: new FormControl(null, [Validators.required]),
    })

    this._route.params.subscribe(params => {
      this.id = params['id']
    })

    this.SearchClient()
  }

  SearchClient() {
    this._clientService.SearchDataClient(this.id)
      .pipe(take(1))
      .subscribe(
        (data: IClient) => {
          this.client = data
        },
        (status: HttpErrorResponse) => {
          alert(`${status.error.mensagem}`)
        })
  }

  EditClient() {
    this.formDice.patchValue({
      name: this.client.name,
      phone: this.client.phone,
      cpf: this.client.cpf,
      birthDate: this.client.birthDate,
      sex: this.client.sex,
      maritalStatus: this.client.maritalStatus,
      cep: this.client.cep,
      city: this.client.city,
      neighborhood: this.client.neighborhood,
      state: this.client.state,
      street: this.client.street,
      number: this.client.number,
      complementAddress: this.client.complement,
    })
  }

  DeletClient() {

    if (confirm('Para deletar a conta click em OK')) {
      this._clientService.DeletClient(this.id)
        .pipe(take(1))
        .subscribe(
          (dice: boolean) => {
            alert('Usuario Excluido com Sucesso')

            window.location.assign('http://localhost:4200')
          },
          (status: HttpErrorResponse) => {
            alert(`${status.error.message}`)
          }
        )
    }
  }

  SalvePassword() {
    const currentPassword = this.formPassword.value.currentPassword
    const newPassword = this.formPassword.value.newPassword

    if (this.formPassword.valid && this.ValidPasswordAndEmail() === true) {
      this._clientService.EditPassword(this.id, currentPassword, newPassword)
        .pipe(take(1))
        .subscribe(
          (dataean) => {
            alert('Senha Atualizada')
          },
          (status: HttpErrorResponse) => {
            alert(`${status.error.mensagem}`)
          })
    }
    else
      alert()
  }

  ValidPasswordAndEmail() {
    const newPassword = this.formPassword.value.newPassword
    const confirmPassword = this.formPassword.value.confirmPassword

    if (newPassword != confirmPassword) {
      alert('Senha e Confirmar Senha devem ser iguais')
      return false
    }
    return true
  }

  SalveDice() {

    if (this.formDice.valid) {
      const UpdateDiceClient: IClient = {
        id: this.id,
        name: this.formDice.value.name,
        cpf: this.formDice.value.cpf.replace(/[^0-9]/g, ''),
        phone: this.formDice.value.phone.replace(/[^0-9]/g, ''),
        birthDate: this.formDice.value.birthDate,
        sex: this.formDice.value.sex,
        maritalStatus: this.formDice.value.maritalStatus,
        cep: this.formDice.value.cep.replace(/[^0-9]/g, ''),
        city: this.formDice.value.city,
        state: this.formDice.value.state,
        neighborhood: this.formDice.value.neighborhood,
        street: this.formDice.value.street,
        number: this.formDice.value.number,
        complement: this.formDice.value.complementAddress,
      }
      this._clientService.UpdateDiceClient(UpdateDiceClient)
        .pipe(take(1))
        .subscribe(
          (dice)=>{
            alert('Editado com Sucesso')
            location.reload()
           },
          (status: HttpErrorResponse) => {
            alert(`${status.error.mensagem}`)
            console.log(status)
          }
        )
    }
    else
    alert('erro')
  }

  SearchCep() {
    this._addressService.SearchCep(this.formDice.value.cep.replace(/[^0-9]/g, ''))
      .pipe(take(1))
      .subscribe(
        (Dice: IAddress) => {
          this.address = Dice;
          this.formDice.patchValue({
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
}



