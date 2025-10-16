import { Component, input, inject, Input } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-boton',
  imports: [ ],
  templateUrl: './boton.html',
  styleUrl: './boton.css'
})
export class Boton {

  direccion = input<String>('/home');
  // @Input()
  // direccion = '/home';
  

}
