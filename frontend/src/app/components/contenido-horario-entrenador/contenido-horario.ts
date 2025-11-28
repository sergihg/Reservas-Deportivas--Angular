import { Component, input, output,  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Evento } from '../../interfaces/evento';
import { Horario } from '../../interfaces/horario';
import { CalendarioSemanal } from '../calendario-semanal/calendario-semanal';
import { Modal } from '../modal/modal';
import { EditarCupos } from '../forms/editar-cupos/editar-cupos';
import { EditarDias } from '../forms/editar-dias/editar-dias';
import { AgregarEvento } from '../forms/agregar-evento/agregar-evento';
import { AgregarHorario } from '../forms/agregar-horario/agregar-horario';

@Component({
  selector: 'app-contenido-horario',
  imports: [ CalendarioSemanal, Modal, EditarCupos, EditarDias, AgregarEvento, AgregarHorario, DatePipe ],
  templateUrl: './contenido-horario.html',
  styleUrl: './contenido-horario.css'
})
export class ContenidoHorario {

  modal : string = '';
  horario = input<Horario>(
    {
      'time': '',
      'days': [],
      'spots': 0
    }
  );
  delete = output<string>()
  deleteEvent = output<string>()
  eventos = input<Evento[]>([]);
  id:string='';

  abrirModal(tipo:string) {
    this.modal = tipo;
  }
  cerrarModal() {
    this.modal = '';
  }
  onConfirm() {
    this.delete.emit(this.horario()._id??'')
  }
  onConfirmEvent() {
    this.deleteEvent.emit(this.id)
  }

}
