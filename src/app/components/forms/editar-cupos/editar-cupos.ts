import { Component, input, output } from '@angular/core';
import { Horario } from '../../../interfaces/horario';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-cupos',
  imports: [ ReactiveFormsModule ],
  templateUrl: './editar-cupos.html',
  styleUrl: './editar-cupos.css'
})
export class EditarCupos {
  horario = input<Horario>({'cupos':0,'dias':[],'hora':'','inscritos':0});
  
  cerrar = output();

  form: FormGroup = new FormGroup({
    hora: new FormControl('',[Validators.required]),
    cupos: new FormControl('',[Validators.required, Validators.min(5), Validators.max(30) ])
  });

  onSubmit() {
    console.log(this.form.value)
  }
  cancelar() {
    this.cerrar.emit();
  }
}
