import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventoService } from '../../../services/evento.service';
import { Evento } from '../../../interfaces/evento';

@Component({
  selector: 'app-agregar-evento',
  imports: [ ReactiveFormsModule ],
  templateUrl: './agregar-evento.html',
  styleUrl: './agregar-evento.css'
})
export class AgregarEvento {
  constructor(private eventoService: EventoService){}

  cerrar = output();
  horarioID = input<string>('');

  form: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
    date: new FormControl('',[Validators.required])
  });

  onSubmit() {
    let newEvent : Evento = this.form.value;
    this.eventoService.create(newEvent,this.horarioID());
  }
  cancelar() {
    this.cerrar.emit();
  }
}
