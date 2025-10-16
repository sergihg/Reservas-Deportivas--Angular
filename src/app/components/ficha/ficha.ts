import { Component, input, output, SimpleChanges } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-ficha',
  imports: [ NgClass ],
  templateUrl: './ficha.html',
  styleUrl: './ficha.css'
})
export class Ficha {

  seleccionActual = input<string|undefined|null>('seleccionActual');
  seleccionado = output<string>();
  texto = input<string|null>('texto');

  seleccionar() {
    const value = typeof this.texto === 'function' ? this.texto() : this.texto;
    if (value != null) {
      this.seleccionado.emit(value as string);
    }
  }
}
