import { Component, inject, input } from '@angular/core';
import { Modal } from '../modal/modal';
import { AuthService } from '../../services/auth.service';
import { NgClass } from '@angular/common';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-dropdown',
  imports: [ Modal, NgClass, Icon ],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css'
})
export class Dropdown {
  constructor(private authService: AuthService) {}

  name = input<string>('')
  modal = false;

  
  abrirModal() {
    this.modal = true;
  }
  cerrarModal() {
    this.modal = false;
  }

  logout() {
    this.cerrarModal()
    this.authService.onLogout();
  }

}
