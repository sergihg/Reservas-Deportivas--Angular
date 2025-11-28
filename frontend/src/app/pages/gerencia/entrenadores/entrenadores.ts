import { Component, signal, Signal } from '@angular/core';
import { Ficha } from '../../../components/ficha/ficha';
import { ContenidoEntrenadores } from '../../../components/contenido-entrenador/contenido-entrenador';
import { Deporte } from '../../../interfaces/deporte';
import { DeporteService } from '../../../services/deporte.service';

@Component({
  selector: 'app-gerencia-entrenadores',
  imports: [ Ficha, ContenidoEntrenadores ],
  templateUrl: './entrenadores.html',
  styleUrl: './entrenadores.css'
})
export class GerenciaEntrenadores {

  deporteVacio : Deporte = 
  {
    'name': '',
    'description': '',
    'entrenadores': [],
    '_id':''
  };
  deporteSeleccionado : Deporte = this.deporteVacio;

  deportes! : Signal<Deporte[]>;
  // deportes: Signal<Deporte[]> = signal<Deporte[]>([]);

  constructor(private deporteService: DeporteService){
    this.deporteService.fetchDeportes();
    this.deportes = this.deporteService.deportes;

  }
  
  seleccionar(id: string) {
    if (this.deporteSeleccionado.name === id)
      this.deporteSeleccionado = this.deporteVacio
    else
      this.deporteSeleccionado = this.deportes().find(d => d.name === id) || this.deporteVacio;
  }

  delete(id:string) {
    this.deporteService.deleteTrainer(id);
  }
}
