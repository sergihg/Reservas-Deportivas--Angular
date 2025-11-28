import { Component, input, output } from '@angular/core';
import { Deporte } from '../../interfaces/deporte';
import { Modal } from '../modal/modal';
import { EditarUsuario } from '../forms/editar-usuario/editar-usuario';
import { AgregarEntrenador } from '../forms/agregar-entrenador/agregar-entrenador';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-contenido-entrenador',
  imports: [ Modal, EditarUsuario, AgregarEntrenador ],
  templateUrl: './contenido-entrenador.html',
  styleUrl: './contenido-entrenador.css'
})
export class ContenidoEntrenadores {
  modal:string = '';
  deporte = input<Deporte>({'name':'','description':'','entrenadores':[],'_id':''});
  selected:User = {_id:''};
  delete = output<string>()
  entrenadorID: string = '';

  abrirModal(tipo:string) {
    this.modal = tipo;
  }
  cerrarModal() {
    this.modal = '';
  }
  selectEntrenador(trainer: User) {
    this.selected = trainer;
  }
  onConfirm() {
    this.delete.emit(this.entrenadorID)
  }
}
