import { Component, input, output } from '@angular/core';
import { Horario } from '../../../interfaces/horario';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HorarioService } from '../../../services/horario.service';

@Component({
  selector: 'app-editar-dias',
  imports: [ ReactiveFormsModule ],
  templateUrl: './editar-dias.html',
  styleUrl: './editar-dias.css'
})
export class EditarDias {
  constructor(private horarioService: HorarioService){}
  cerrar = output();
  horario = input<Horario>({'spots':0,'days':[],'time':''});
  
  form: FormGroup = new FormGroup({
    day1: new FormControl(),
    day2: new FormControl(),
    day3: new FormControl(),
    day4: new FormControl(),
    day5: new FormControl(),
  });
  onSubmit() {
    this.horarioService.updateDays(this.form.value,this.horario()._id??'')
  }
  cancelar() {
    this.cerrar.emit();
  }
}
