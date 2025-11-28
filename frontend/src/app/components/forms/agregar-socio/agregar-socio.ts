import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-agregar-socio',
  imports: [ ReactiveFormsModule ],
  templateUrl: './agregar-socio.html',
  styleUrl: './agregar-socio.css'
})
export class AgregarSocio {
  constructor(private userService: UserService){}

  cerrar = output();

  sport = input<string>()

  form: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    code: new FormControl(0, [Validators.required]),
  });

  onSubmit() {
    this.userService.create(this.form.value,'socio');
  }
  cancelar() {
    this.cerrar.emit();
  }
}
