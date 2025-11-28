import { Component, signal, Signal } from '@angular/core';
import { Horario } from '../../interfaces/horario';
import { Evento } from '../../interfaces/evento';
import { HorarioService } from '../../services/horario.service';
import { EventoService } from '../../services/evento.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [ DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  horarios!: Signal<Horario[]>;
  eventos!: Signal<Evento[]>;

  user!: Signal<User>;

  constructor(private horarioService: HorarioService, private eventoService: EventoService, private authService: AuthService) {
    this.authService.getUser();
    this.user = this.authService.user;
    if(this.user()?.role !== 'gerencia') {
      this.horarioService.fetchToday();
      this.eventoService.fetchTodayEventos();
      this.horarios = this.horarioService.horarios;
      this.eventos = this.eventoService.eventos;
    }
  }

}
