import { Component, signal, Signal } from '@angular/core';
import { Ficha } from '../../../components/ficha/ficha';
import { ContenidoDeporte } from '../../../components/contenido-deporte/contenido-deporte';
import { Horario } from '../../../interfaces/horario';
import { Deporte } from '../../../interfaces/deporte';
import { DeporteService } from '../../../services/deporte.service';
import { HorarioService } from '../../../services/horario.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-socio-deportes',
  imports: [ Ficha, ContenidoDeporte ],
  templateUrl: './deportes.html',
  styleUrl: './deportes.css'
})
export class SocioDeportes {

  deporteVacio : Deporte = 
  {
    'name': '',
    'description': '',
    '_id':''
  };
  horariosVacios : Horario[] = [{
    'days':[],
    'time':'',
    'spots':0
  }]
  deporteSeleccionado : Deporte = this.deporteVacio;

  deportes!: Signal<Deporte[]>;
  horarios!: Signal<Horario[]>;
  user!: Signal<User>;

  constructor(private deporteService: DeporteService, private horarioService: HorarioService, private authService: AuthService){
    this.deporteService.fetchDeportes();
    this.deportes = this.deporteService.deportes;
    this.horarios = signal(this.horariosVacios);
    this.authService.getUser();
    this.user = this.authService.user;
  }

  seleccionar(id: string) {
    if (this.deporteSeleccionado.name === id){
      this.deporteSeleccionado = this.deporteVacio
    }
    else
      this.deporteSeleccionado = this.deportes().find(d => d.name === id) || this.deporteVacio;
      this.horarioService.fetchHorariosDeporte(this.deporteSeleccionado._id??'')
      this.horarios = this.horarioService.horarios
  }

  enroll(id: string) {
    this.horarioService.enroll(id);
  }
}
