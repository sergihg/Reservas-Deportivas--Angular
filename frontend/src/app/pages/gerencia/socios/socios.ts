import { Component, Signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { Modal } from '../../../components/modal/modal';
import { EditarUsuario } from '../../../components/forms/editar-usuario/editar-usuario';
import { AgregarSocio } from '../../../components/forms/agregar-socio/agregar-socio';

@Component({
  selector: 'app-socios',
  imports: [ Modal, EditarUsuario, AgregarSocio],
  templateUrl: './socios.html',
  styleUrl: './socios.css'
})
export class GerenciaSocios {
  socios! : Signal<User[]>;
  constructor(private userService: UserService) {
    this.userService.fetchSocios();
    this.socios = this.userService.users;
  }
  modal:string = '';
  selected: User ={};

  abrirModal(tipo:string) {
    this.modal = tipo;
  }
  cerrarModal() {
    this.modal = '';
  }
  deleteSocio() {
    this.userService.delete(this.selected._id??'');
  }
}
