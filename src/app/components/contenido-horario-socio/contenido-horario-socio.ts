import { Component, input } from '@angular/core';
import { Evento } from '../../interfaces/evento';
import { Horario } from '../../interfaces/horario';
import { CalendarioSemanal } from '../calendario-semanal/calendario-semanal';
import { Deporte } from '../../interfaces/deporte';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-contenido-horario-socio',
  imports: [ CalendarioSemanal, Modal ],
  templateUrl: './contenido-horario-socio.html',
  styleUrl: './contenido-horario-socio.css'
})
export class ContenidoHorarioSocio {
  modal :boolean = false;
  horario = input<Horario>(
    {
      'hora': '',
      'dias': [1,2],
      'cupos': 0,
      'inscritos': 0
    }
  );
  deporte = input<Deporte>({
    'nombre': 'deporte',
    'descripcion': 'descripcion descriptiva'
  });
  eventos = input<Evento[]>([]);

  
  abrirModal() {
    this.modal = true;
  }
  cerrarModal() {
    this.modal = false;
  }
}
