import { Component, input, signal, Signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Ficha } from '../ficha/ficha';
import { Evento } from '../../interfaces/evento';
import { Horario } from '../../interfaces/horario';
import { Deporte } from '../../interfaces/deporte';
import { ContenidoHorarioSocio } from '../contenido-horario-socio/contenido-horario-socio';
import { HorarioService } from '../../services/horario.service';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-inscripciones-socio',
  imports: [ Ficha, NgClass, ContenidoHorarioSocio ],
  templateUrl: './inscripciones-socio.html',
  styleUrl: './inscripciones-socio.css'
})
export class InscripcionesSocio {

  horarios! : Signal<Horario[]>;
  eventos:Signal<Evento[]> = signal([]);
  constructor(private horarioService: HorarioService, private eventoService: EventoService){
  }
  
  horarioVacio : Horario = 
  {
    'time': '',
    'days': [],
    'spots': 0
  };
  deporteVacio : Deporte = 
  {
    'name': '',
    'description': '',
    '_id':''
  };
  horarioSeleccionado : Horario= this.horarioVacio;
  deporteSeleccionado : Deporte= this.deporteVacio;

  deportes = input<Deporte[]>([]);


  seleccionarDeporte(id: string) {
    this.deporteSeleccionado = this.deportes().find(h => h.name === id) || this.deporteVacio;
    this.horarioSeleccionado = this.horarioVacio;
    
    this.horarioService.getMyHorariosDeporte(this.deporteSeleccionado._id??'')
    this.horarios = this.horarioService.horarios
  }

  seleccionarHorario(id: string) {
    if (this.horarioSeleccionado.time === id)
      this.horarioSeleccionado = this.horarioVacio;
    else 
    {
      this.horarioSeleccionado = this.horarios().find(h => h.time === id) || this.horarioVacio;
      this.eventoService.get(this.horarioSeleccionado._id??'');
      this.eventos = this.eventoService.eventos;
    }
  }

  leave(id: string) {
    this.horarioService.leave(id);
  }

}
