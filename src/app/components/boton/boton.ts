import { Component, input, inject, Input } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-boton',
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './boton.html',
  styleUrl: './boton.css'
})
export class Boton {

  direccion = input<String>('/home');
  // @Input()
  // direccion = '/home';
  

}
