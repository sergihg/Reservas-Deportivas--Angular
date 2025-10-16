import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Ficha } from '../ficha/ficha';
import { Evento } from '../../interfaces/evento';
import { Horario } from '../../interfaces/horario';
import { Deporte } from '../../interfaces/deporte';
import { ContenidoHorarioSocio } from '../contenido-horario-socio/contenido-horario-socio';

@Component({
  selector: 'app-inscripciones-socio',
  imports: [ Ficha, NgClass, ContenidoHorarioSocio ],
  templateUrl: './inscripciones-socio.html',
  styleUrl: './inscripciones-socio.css'
})
export class InscripcionesSocio {
  horarioVacio : Horario = 
  {
    'hora': '',
    'dias': [],
    'cupos': 0,
    'inscritos': 0
  };
  deporteVacio : Deporte = 
  {
    'nombre': '',
    'descripcion': ''
  };
  horarioSeleccionado : Horario= this.horarioVacio;
  deporteSeleccionado : Deporte= this.deporteVacio;

  deportes = input<Deporte[]>([]);
  horarios = input<Horario[]>([]);

  // eventos = null;
  eventos = [
    {
      'fecha': "31-10-2025",
      'titulo': 'evento del horario'
    },
    {
      'fecha': "31-10-2025",
      'titulo': 'evento del horario'
    },
    {
      'fecha': "31-10-2025",
      'titulo': 'evento del horario'
    },
    {
      'fecha': "31-10-2025",
      'titulo': 'evento del horario'
    },
    {
      'fecha': "31-10-2025",
      'titulo': 'evento del horario'
    },
  ]

  seleccionarDeporte(id: string) {
    this.deporteSeleccionado = this.deportes().find(h => h.nombre === id) || this.deporteVacio;
    this.horarioSeleccionado = this.horarioVacio;
  }

  seleccionarHorario(id: string) {
    if (this.horarioSeleccionado.hora === id)
      this.horarioSeleccionado = this.horarioVacio;
    else
      this.horarioSeleccionado = this.horarios().find(h => h.hora === id) || this.horarioVacio;
  }

}
