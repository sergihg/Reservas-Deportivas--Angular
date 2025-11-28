import { Component, Signal } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../interfaces/evento';
import { HorarioService } from '../../services/horario.service';
import { Horario } from '../../interfaces/horario';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-calendario',
  imports: [ NgClass],
  templateUrl: './calendario.html',
  styleUrl: './calendario.css'
})
export class Calendario {

  eventos! : Signal<Evento[]>;
  horarios! : Signal<Horario[]>;

  today = new Date();
  year = this.today.getFullYear();
  month = this.today.getMonth();
  firstDayOfMonth = new Date(this.year, this.month, 1);
  lastDayOfMonth = new Date(this.year, this.month+1, 0);
  firstWeekOfMonth = this.firstDayOfMonth.getDay();
  lastWeekOfMonth = this.lastDayOfMonth.getDay();

  firstEmptyDays = this.calculateDaysInRange(this.firstWeekOfMonth-1)
  lastEmptyDays = this.calculateDaysInRange(7-this.lastWeekOfMonth)
  days = this.calculateDaysInRange(this.lastDayOfMonth.getDate());

  current = 0

  constructor(private eventoService: EventoService, private horarioService: HorarioService) {
    this.eventoService.fetch();
    this.eventos = this.eventoService.eventos;
    this.horarioService.fetch();
    this.horarios = this.horarioService.horarios;
    console.log(this.eventos())
    console.log(this.horarios())
  }

  calculateDaysInRange(last: number) {
    if(last < 0)
      last = 6;
    if(last === 0)
      return []

    let numbers = [];
    for (let i = 1; i <= last; i++) {
      numbers.push(i);
    }
    return numbers
  }

  horariosToday(day: number) {
    let weekDay = (new Date(this.year, this.month, day)).getDay()-1;

    let result = ''

    this.horarios().forEach(horario => {
      if (horario.days.includes(weekDay)) {
        result += 'día de '+horario.sport?.name
        result += '\n'
      }
    })

    return result;
  }
  eventosToday(day: number) {
    let result = '';

    this.eventos().forEach(evento => {
      let eventDate = new Date(evento.date)
      if (eventDate.getFullYear() === this.year && eventDate.getMonth() === this.month && eventDate.getDate()+1 === day) {
        result += '' + evento.title;
        result += '\n';
      }
    })

    return result;
  }

  isToday(day: number) {
    if (day ===this.today.getDate()) {
      return true
    }
    return false
  }
}
