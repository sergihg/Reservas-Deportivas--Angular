import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-evento',
  imports: [ ReactiveFormsModule ],
  templateUrl: './agregar-evento.html',
  styleUrl: './agregar-evento.css'
})
export class AgregarEvento {

  cerrar = output();

  form: FormGroup = new FormGroup({
    titulo: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
    fecha: new FormControl('',[Validators.required])
  });

  onSubmit() {
    console.log(this.form.value)
  }
  cancelar() {
    this.cerrar.emit();
  }
}
