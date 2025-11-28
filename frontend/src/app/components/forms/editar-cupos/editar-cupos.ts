import { Component, input, output } from '@angular/core';
import { Horario } from '../../../interfaces/horario';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HorarioService } from '../../../services/horario.service';

@Component({
  selector: 'app-editar-cupos',
  imports: [ ReactiveFormsModule ],
  templateUrl: './editar-cupos.html',
  styleUrl: './editar-cupos.css'
})
export class EditarCupos {
  constructor(private horarioService: HorarioService){}
  horario = input<Horario>({'spots':0,'days':[],'time':''});
  
  cerrar = output();

  form: FormGroup = new FormGroup({
    time: new FormControl('',[Validators.required]),
    spots: new FormControl('',[Validators.required, Validators.min(5), Validators.max(30) ])
  });

  onSubmit() {
    this.horarioService.update(this.form.value,this.horario()._id??'');
  }
  cancelar() {
    this.cerrar.emit();
  }
}
