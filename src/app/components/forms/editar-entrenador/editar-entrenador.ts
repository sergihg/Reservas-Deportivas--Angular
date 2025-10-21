import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-entrenador',
  imports: [ ReactiveFormsModule ],
  templateUrl: './editar-entrenador.html',
  styleUrl: './editar-entrenador.css'
})
export class EditarEntrenador {

  cerrar = output();

  form: FormGroup = new FormGroup({
    nombre: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    correo: new FormControl('',[Validators.required, Validators.email])
  });

  onSubmit() {
    console.log(this.form.value)
  }
  cancelar() {
    this.cerrar.emit();
  }
}
