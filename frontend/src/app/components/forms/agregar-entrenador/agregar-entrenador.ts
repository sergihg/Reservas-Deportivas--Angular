import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-agregar-entrenador',
  imports: [ ReactiveFormsModule ],
  templateUrl: './agregar-entrenador.html',
  styleUrl: './agregar-entrenador.css'
})
export class AgregarEntrenador {
  constructor(private userService: UserService){}

  cerrar = output();

  sport = input<string>()

  form: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  onSubmit() {
    console.log(this.sport())
    var sportValue : string = this.sport() ?? '';
    this.userService.create(this.form.value,'entrenador',sportValue);
  }
  cancelar() {
    this.cerrar.emit();
  }
}
