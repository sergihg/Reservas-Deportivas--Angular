import { Component, input } from '@angular/core';
import { Horario } from '../../../interfaces/horario';

@Component({
  selector: 'app-editar-cupos',
  imports: [],
  templateUrl: './editar-cupos.html',
  styleUrl: './editar-cupos.css'
})
export class EditarCupos {
  horario = input<Horario>({'cupos':0,'dias':[],'hora':'','inscritos':0});
}
