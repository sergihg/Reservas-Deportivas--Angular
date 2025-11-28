import { Component, Signal } from '@angular/core';
import { Ficha } from '../../../components/ficha/ficha';
import { ContenidoDeporte } from '../../../components/contenido-deporte/contenido-deporte';
import { Deporte } from '../../../interfaces/deporte';
import { Modal } from '../../../components/modal/modal';
import { AgregarDeporte } from '../../../components/forms/agregar-deporte/agregar-deporte';
import { EditarDeporte } from '../../../components/forms/editar-deporte/editar-deporte';
import { DeporteService } from '../../../services/deporte.service';

@Component({
  selector: 'app-gerencia-deportes',
  imports: [ Ficha, ContenidoDeporte, Modal, AgregarDeporte, EditarDeporte ],
  templateUrl: './deportes.html',
  styleUrl: './deportes.css'
})
export class GerenciaDeportes {
  modal:string = '';

  deporteVacio : Deporte = 
  {
    'name': '',
    'description': '',
    'entrenadores': [],
    '_id':''
  };
  deporteSeleccionado : Deporte = this.deporteVacio;

  deportes!: Signal<Deporte[]>;

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
  abrirModal(tipo:string) {
    this.modal = tipo;
  }
  cerrarModal() {
    this.modal = '';
  }
  delete(id:string) {
    this.deporteService.delete(id);
  }
}
