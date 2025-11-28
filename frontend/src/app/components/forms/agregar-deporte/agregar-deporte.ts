import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeporteService } from '../../../services/deporte.service';

@Component({
  selector: 'app-agregar-deporte',
  imports: [ ReactiveFormsModule ],
  templateUrl: './agregar-deporte.html',
  styleUrl: './agregar-deporte.css'
})
export class AgregarDeporte {
  constructor(private deporteService: DeporteService){}

  cerrar = output();

  form: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    description: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(300)])
  });

  onSubmit() {
    this.deporteService.create(this.form.value)

  }
  cancelar() {
    this.cerrar.emit();
  }
}
