import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-horario',
  imports: [ ReactiveFormsModule ],
  templateUrl: './agregar-horario.html',
  styleUrl: './agregar-horario.css'
})
export class AgregarHorario {

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
