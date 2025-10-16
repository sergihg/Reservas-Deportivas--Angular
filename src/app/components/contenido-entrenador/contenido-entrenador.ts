import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Deporte } from '../../interfaces/deporte';

@Component({
  selector: 'app-contenido-entrenador',
  imports: [ NgClass],
  templateUrl: './contenido-entrenador.html',
  styleUrl: './contenido-entrenador.css'
})
export class ContenidoEntrenadores {
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
}
