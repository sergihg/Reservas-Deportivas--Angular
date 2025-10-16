import { Component, input } from '@angular/core';
import { Horario } from '../../../interfaces/horario';

@Component({
  selector: 'app-editar-dias',
  imports: [],
  templateUrl: './editar-dias.html',
  styleUrl: './editar-dias.css'
})
export class EditarDias {
  horario = input<Horario>({'cupos':0,'dias':[],'hora':'','inscritos':0});
}
