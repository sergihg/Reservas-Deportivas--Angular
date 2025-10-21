import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-deporte',
  imports: [ ReactiveFormsModule ],
  templateUrl: './agregar-deporte.html',
  styleUrl: './agregar-deporte.css'
})
export class AgregarDeporte {

  cerrar = output();

  form: FormGroup = new FormGroup({
    nombre: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    descripcion: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(300)])
  });

  onSubmit() {
    console.log(this.form.value)
  }
  cancelar() {
    this.cerrar.emit();
  }
}
