import { Component } from '@angular/core';
import { Boton } from '../boton/boton';

@Component({
  selector: 'app-header',
  imports: [ Boton ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
