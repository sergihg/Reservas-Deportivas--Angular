import { Component, input, output } from '@angular/core';
import { Deporte } from '../../../interfaces/deporte';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-deporte',
  imports: [ ReactiveFormsModule ],
  templateUrl: './editar-deporte.html',
  styleUrl: './editar-deporte.css'
})
export class EditarDeporte {
  deporte = input<Deporte>({'descripcion':'','nombre':''});
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
