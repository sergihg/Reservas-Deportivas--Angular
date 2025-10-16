import { Component } from '@angular/core';
import { InscripcionesSocio } from '../../../components/inscripciones-socio/inscripciones-socio';
import { Deporte } from '../../../interfaces/deporte';
import { Horario } from '../../../interfaces/horario';

@Component({
  selector: 'app-socio-horarios',
  imports: [ InscripcionesSocio ],
  templateUrl: './horarios.html',
  styleUrl: './horarios.css'
})
export class SocioHorarios {
  horarioSeleccionado : string|null = null;

  deportes :Deporte[]= [
    {
      'nombre':'deporte', 
      'descripcion':'descripcion descriptiva 1'
    },
    {
      'nombre':'deporte 2', 
      'descripcion':'descripcion descriptiva 2'
    },
  ];

  horarios : Horario[] = [
    {
      'hora': '9:00',
      'dias': [2,3,5],
      'cupos': 20,
      'inscritos':1
    },
    {
      'hora': '10:00',
      'dias': [1,3,4],
      'cupos': 20,
      'inscritos':2
    }
  ];

  seleccionar(id: string) {
    if (this.horarioSeleccionado === id)
      this.horarioSeleccionado = null
    else
      this.horarioSeleccionado = id
  }

}
