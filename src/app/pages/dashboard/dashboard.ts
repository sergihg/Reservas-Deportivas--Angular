import { Component } from '@angular/core';
import { Horario } from '../../interfaces/horario';
import { Evento } from '../../interfaces/evento';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  horarios = [
    '14:00', '16:00'
  ]

  eventos: Evento[]=[ {
    'fecha' : '11-11-2025',
    'titulo' : 'evento proximo'
  },{
    'fecha' : '11-11-2025',
    'titulo' : 'evento proximo'
  },{
    'fecha' : '11-11-2025',
    'titulo' : 'evento proximo'
  },
  ]

}
