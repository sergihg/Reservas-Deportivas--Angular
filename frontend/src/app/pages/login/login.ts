import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule, NgClass, RouterLink ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private authService : AuthService, private router: Router){}

  form: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(300)])
  });

  onSubmit() {
    this.authService.onLogin(this.form.value).subscribe(
      {
        next: (data: any) => {
          console.log(data);
          localStorage.setItem("token",data.token);
          this.router.navigateByUrl("dashboard").then((data)=> window.location.reload());
        },
        error: (error:any) => {
          console.log("Error con el inicio de sesión: ", error);

        }
      }
    )
  }

}
