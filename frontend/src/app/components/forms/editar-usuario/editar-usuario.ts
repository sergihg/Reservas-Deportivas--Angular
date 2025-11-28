import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-editar-usuario',
  imports: [ ReactiveFormsModule ],
  templateUrl: './editar-usuario.html',
  styleUrl: './editar-usuario.css'
})
export class EditarUsuario {
  constructor(private userService: UserService){}

  cerrar = output();

  user = input<User>({name:'',email:'',_id:''});

  form: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    email: new FormControl('',[Validators.required, Validators.email])
  });

  onSubmit() {
    this.userService.update(this.form.value,this.user()._id??'');
  }
  cancelar() {
    this.cerrar.emit();
  }
}
