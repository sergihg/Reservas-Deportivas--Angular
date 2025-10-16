import { Component, input } from '@angular/core';
import { Deporte } from '../../interfaces/deporte';
import { Horario } from '../../interfaces/horario';
import { Modal } from '../modal/modal';
// import { Deporte } from '../../interfaces/deporte';

@Component({
  selector: 'app-contenido-deporte',
  imports: [ Modal],
  templateUrl: './contenido-deporte.html',
  styleUrl: './contenido-deporte.css'
})
export class ContenidoDeporte {
  modal :boolean = false;

  socio = input<boolean>(false);
  deporte = input<Deporte>(
  {
    'nombre': '',
    'descripcion': ''
  });

  horarios : Horario[] = [
    {
      'hora': '9:00',
      'dias': [2,3,4],
      'inscritos': 2,
      'cupos': 20
    },
    {
      'hora': '11:00',
      'dias': [2,5],
      'inscritos': 3,
      'cupos': 20
    },
    {
      'hora': '12:00',
      'dias': [2,3,4],
      'inscritos': 5,
      'cupos': 20
    },
    {
      'hora': '13:00',
      'dias': [1,2,3],
      'inscritos': 2,
      'cupos': 20
    },
    {
      'hora': '16:00',
      'dias': [1,3,5],
      'inscritos': 8,
      'cupos': 20
    },
  ]
  abrirModal() {
    this.modal = true;
  }
  cerrarModal() {
    this.modal = false;
  }

}
