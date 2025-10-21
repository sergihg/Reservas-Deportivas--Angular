import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-entrenador',
  imports: [ ReactiveFormsModule ],
  templateUrl: './agregar-entrenador.html',
  styleUrl: './agregar-entrenador.css'
})
export class AgregarEntrenador {

  cerrar = output();

  form: FormGroup = new FormGroup({
    nombre: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  onSubmit() {
    console.log(this.form.value)
  }
  cancelar() {
    this.cerrar.emit();
  }
}
