import { Component, input, inject, Input } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-boton',
  imports: [ RouterLink, RouterLinkActive, Icon ],
  templateUrl: './boton.html',
  styleUrl: './boton.css'
})
export class Boton {

  direccion = input<String>('/home');
  icon = input<string>('');
  // @Input()
  // direccion = '/home';
  

}
