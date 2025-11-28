import { Component, input, output } from '@angular/core';
import { Deporte } from '../../interfaces/deporte';
import { Horario } from '../../interfaces/horario';
import { Modal } from '../modal/modal';
import { User } from '../../interfaces/user';
import { NgClass } from '@angular/common';
// import { Deporte } from '../../interfaces/deporte';

@Component({
  selector: 'app-contenido-deporte',
  imports: [ Modal, NgClass],
  templateUrl: './contenido-deporte.html',
  styleUrl: './contenido-deporte.css'
})
export class ContenidoDeporte {
  modal :string = '';

  socio = input<boolean>(false);

  enroll = output<string>()
  delete = output<string>()

  deporte = input<Deporte>(
  {
    'name': '',
    'description': '',
    '_id':''
  });

  horarios = input<Horario[]>([]);
  user = input<User>({
    '_id': ''
  });
  selectedID = '';

  abrirModal(type:string) {
    this.modal = type;
  }
  cerrarModal() {
    this.modal = '';
  }

  onConfirm() {
    if(this.modal==='inscribir')
      this.enroll.emit(this.selectedID)
    else
      this.delete.emit(this.selectedID)
  }

  isEnrolled(horario: Horario): boolean {
    if (!horario.enrolled || !this.user()?._id) {
      return false;
    }
    return horario.enrolled.some(u => u._id === this.user()?._id);
  }

  days(days:number[]) {
    let daysStrings : string[] = [];
    days.forEach(day => {
      switch(day) {
        case 1:
          daysStrings.push('Martes')
          break;
        case 2:
          daysStrings.push('Miércoles')
          break;
        case 3:
          daysStrings.push('Jueves')
          break;
        case 4:
          daysStrings.push('Viernes')
          break;
        case 5:
          daysStrings.push('Sábado')
          break;
      }
    })
    return daysStrings.join('-')
  }

}
