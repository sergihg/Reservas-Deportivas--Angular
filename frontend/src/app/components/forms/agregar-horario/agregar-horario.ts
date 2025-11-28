import { Component, output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HorarioService } from '../../../services/horario.service';

@Component({
  selector: 'app-agregar-horario',
  imports: [ ReactiveFormsModule ],
  templateUrl: './agregar-horario.html',
  styleUrl: './agregar-horario.css'
})
export class AgregarHorario {
  constructor(private horarioService: HorarioService){}

  cerrar = output();

  form: FormGroup = new FormGroup({
    time: new FormControl('',[Validators.required]),
    spots: new FormControl('',[Validators.required, Validators.min(5), Validators.max(30) ]),
    day1: new FormControl(),
    day2: new FormControl(),
    day3: new FormControl(),
    day4: new FormControl(),
    day5: new FormControl(),
  });

  onSubmit() {
    this.horarioService.create(this.form.value)
    
  }
  cancelar() {
    this.cerrar.emit();
  }
}
