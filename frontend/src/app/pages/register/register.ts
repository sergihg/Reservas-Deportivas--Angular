import { NgClass } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Deporte } from '../../interfaces/deporte';
import { Solicitud } from '../../interfaces/solicitud';
import { DeporteService } from '../../services/deporte.service';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-register',
  imports: [ ReactiveFormsModule, NgClass ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  deportes! : Signal<Deporte[]>;

  constructor(private deporteService: DeporteService, private solicitudService: SolicitudService){
    this.deporteService.fetchDeportes();
    this.deportes = this.deporteService.deportes;
  }

  currentType: String = '';

  form: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(300)]),
    role: new FormControl('default',[Validators.required]),
    sport: new FormControl('default'),
    code: new FormControl('00000'),
  });

  onSubmit() {
    let newSolicitud: Solicitud = this.form.value;
    this.solicitudService.createSolicitud(newSolicitud);
  }

  onChange(role: any) {
    try {
      this.currentType = role.target.value
    } catch(error) {
    }
  }

}
