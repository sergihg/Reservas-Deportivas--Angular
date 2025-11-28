import { Component, signal, Signal } from '@angular/core';
import { Ficha } from '../../../components/ficha/ficha';
import { ContenidoHorario } from '../../../components/contenido-horario-entrenador/contenido-horario';
import { Horario } from '../../../interfaces/horario';
import { HorarioService } from '../../../services/horario.service';
import { EventoService } from '../../../services/evento.service';
import { Evento } from '../../../interfaces/evento';

@Component({
  selector: 'app-entrenador-horarios',
  imports: [ Ficha, ContenidoHorario ],
  templateUrl: './horarios.html',
  styleUrl: './horarios.css'
})
export class EntrenadorHorarios {

  horarios!: Signal<Horario[]>;
  eventos:Signal<Evento[]> = signal([]);

  constructor(private horarioService: HorarioService, private eventoService: EventoService){
    this.horarioService.fetchHorarios();
    this.horarios = this.horarioService.horarios;
  }

  horarioVacio : Horario = 
    {
      'time': '',
      'days': [],
      'spots': 0
    };
  horarioSeleccionado : Horario= this.horarioVacio;


  seleccionar(id: string) {
    if (this.horarioSeleccionado.time === id)
      this.horarioSeleccionado = this.horarioVacio;
    else
      this.horarioSeleccionado = this.horarios().find(h => h.time === id) || this.horarioVacio;
      this.eventoService.get(this.horarioSeleccionado._id??'');
      this.eventos = this.eventoService.eventos;
  }

  delete(id:string) {
    this.horarioService.delete(id);
  }
  deleteEvent(id:string) {
    this.eventoService.delete(id);
  }

}
