import { Component, Signal } from '@angular/core';
import { Boton } from '../boton/boton';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { Dropdown } from '../dropdown/dropdown';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [ Boton, Dropdown ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  user!: Signal<User>;
  logged!: Signal<boolean>;
  constructor(private authService: AuthService){
    this.authService.getUser();
    this.logged = toSignal(this.authService.isAuthenticated(), { initialValue: false });
    this.user = this.authService.user;
  }
}
