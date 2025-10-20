import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Deporte } from '../../interfaces/deporte';
import { Modal } from '../modal/modal';
import { EditarEntrenador } from '../forms/editar-entrenador/editar-entrenador';
import { AgregarEntrenador } from '../forms/agregar-entrenador/agregar-entrenador';

@Component({
  selector: 'app-contenido-entrenador',
  imports: [ NgClass, Modal, EditarEntrenador, AgregarEntrenador ],
  templateUrl: './contenido-entrenador.html',
  styleUrl: './contenido-entrenador.css'
})
export class ContenidoEntrenadores {
  modal:string = '';
  deporte = input<Deporte>({'nombre':'','descripcion':''});

  entrenadores = input(
    [
        {
          'nombre': 'Nombre de entrenador'
        },
        {
          'nombre': 'Nombre de entrenador 2'
        },
        {
          'nombre': 'Nombre de entrenador 3'
        },
    ]
  );
  abrirModal(tipo:string) {
    this.modal = tipo;
  }
  cerrarModal() {
    this.modal = '';
  }
}
