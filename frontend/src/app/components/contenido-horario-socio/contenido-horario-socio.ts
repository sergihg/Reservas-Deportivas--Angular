import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Evento } from '../../interfaces/evento';
import { Horario } from '../../interfaces/horario';
import { CalendarioSemanal } from '../calendario-semanal/calendario-semanal';
import { Deporte } from '../../interfaces/deporte';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-contenido-horario-socio',
  imports: [ CalendarioSemanal, Modal, DatePipe ],
  templateUrl: './contenido-horario-socio.html',
  styleUrl: './contenido-horario-socio.css'
})
export class ContenidoHorarioSocio {
  modal :boolean = false;
  horario = input<Horario>(
    {
      'time': '',
      'days': [],
      'spots': 0
    }
  );
  deporte = input<Deporte>({
    'name': '',
    'description': '',
    '_id':''
  });
  eventos = input<Evento[]>([]);

  
  leave = output<string>()
  selectedHorario = '';

  abrirModal(id:string) {
    this.selectedHorario = id;
    this.modal = true;
  }
  cerrarModal() {
    this.modal = false;
  }
  onConfirm() {
    this.leave.emit(this.selectedHorario)
  }
}
