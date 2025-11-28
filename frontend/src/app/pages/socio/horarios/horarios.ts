import { Component, Signal } from '@angular/core';
import { InscripcionesSocio } from '../../../components/inscripciones-socio/inscripciones-socio';
import { Deporte } from '../../../interfaces/deporte';
import { DeporteService } from '../../../services/deporte.service';

@Component({
  selector: 'app-socio-horarios',
  imports: [ InscripcionesSocio ],
  templateUrl: './horarios.html',
  styleUrl: './horarios.css'
})
export class SocioHorarios {
  deportes!: Signal<Deporte[]>;
  horarioSeleccionado : string|null = null;


  constructor(private deporteService: DeporteService) {
    this.deporteService.getMySports();
    this.deportes = this.deporteService.deportes;
  }


}
