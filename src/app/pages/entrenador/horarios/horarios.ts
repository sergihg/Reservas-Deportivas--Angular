import { Component } from '@angular/core';
import { Ficha } from '../../../components/ficha/ficha';
import { ContenidoHorario } from '../../../components/contenido-horario-entrenador/contenido-horario';
import { Horario } from '../../../interfaces/horario';

@Component({
  selector: 'app-entrenador-horarios',
  imports: [ Ficha, ContenidoHorario ],
  templateUrl: './horarios.html',
  styleUrl: './horarios.css'
})
export class EntrenadorHorarios {
  horarioVacio : Horario = 
    {
      'hora': '',
      'dias': [],
      'cupos': 0,
      'inscritos': 0
    };
  horarioSeleccionado : Horario= this.horarioVacio;

  horarios : Horario[] = [
    {
      'hora': '9:00',
      'dias': [2,3,5],
      'cupos': 20,
      'inscritos': 2
    },
    {
      'hora': '10:00',
      'dias': [1,3,4],
      'cupos': 20,
      'inscritos': 3
    }
  ];

  seleccionar(id: string) {
    if (this.horarioSeleccionado.hora === id)
      this.horarioSeleccionado = this.horarioVacio;
    else
      this.horarioSeleccionado = this.horarios.find(h => h.hora === id) || this.horarioVacio;
  }



}
