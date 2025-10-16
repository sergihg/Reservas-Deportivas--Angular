import { Component, input } from '@angular/core';
import { Deporte } from '../../../interfaces/deporte';

@Component({
  selector: 'app-editar-deporte',
  imports: [],
  templateUrl: './editar-deporte.html',
  styleUrl: './editar-deporte.css'
})
export class EditarDeporte {
  deporte = input<Deporte>({'descripcion':'','nombre':''});

}
