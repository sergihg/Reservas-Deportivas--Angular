import { Component, input, output } from '@angular/core';
import { Deporte } from '../../../interfaces/deporte';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeporteService } from '../../../services/deporte.service';

@Component({
  selector: 'app-editar-deporte',
  imports: [ ReactiveFormsModule ],
  templateUrl: './editar-deporte.html',
  styleUrl: './editar-deporte.css'
})
export class EditarDeporte {
  constructor(private deporteService: DeporteService){}

  deporte = input<Deporte>({'description':'','name':'','_id':''});
  cerrar = output();

  form: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    description: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(300)])
  });

  onSubmit() {
    this.deporteService.update(this.form.value,this.deporte()._id)

  }
  cancelar() {
    this.cerrar.emit();
  }

}
