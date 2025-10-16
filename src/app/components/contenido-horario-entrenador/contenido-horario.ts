import { Component, input } from '@angular/core';
import { Socio } from '../../interfaces/Socio';
import { Evento } from '../../interfaces/evento';
import { Horario } from '../../interfaces/horario';
import { CalendarioSemanal } from '../calendario-semanal/calendario-semanal';
import { Modal } from '../modal/modal';
import { EditarCupos } from '../forms/editar-cupos/editar-cupos';
import { EditarDias } from '../forms/editar-dias/editar-dias';
import { AgregarEvento } from '../forms/agregar-evento/agregar-evento';
import { AgregarHorario } from '../forms/agregar-horario/agregar-horario';

@Component({
  selector: 'app-contenido-horario',
  imports: [ CalendarioSemanal, Modal, EditarCupos, EditarDias, AgregarEvento, AgregarHorario ],
  templateUrl: './contenido-horario.html',
  styleUrl: './contenido-horario.css'
})
export class ContenidoHorario {
  modal : string = '';
  horario = input<Horario>(
    {
      'hora': '',
      'dias': [1,2],
      'cupos': 0,
      'inscritos': 0
    }
  );
  inscritos = input<Socio[]|null>([
    {
      'clave': 12345,
      'nombre': 'Nombre de socio'
    },
    {
      'clave': 12345,
      'nombre': 'Nombre de socio 2'
    },
  ]);
  eventos = input<Evento[]>([
  //   {
  //     'fecha': "31-10-2025",
  //     'titulo': 'evento del horario'
  //   },
  //   {
  //     'fecha': "31-10-2025",
  //     'titulo': 'evento del horario'
  //   },
  //   {
  //     'fecha': "31-10-2025",
  //     'titulo': 'evento del horario'
  //   },
  //   {
  //     'fecha': "31-10-2025",
  //     'titulo': 'evento del horario'
  //   },
  //   {
  //     'fecha': "31-10-2025",
  //     'titulo': 'evento del horario'
  //   },
  ]);

  abrirModal(tipo:string) {
    this.modal = tipo;
  }
  cerrarModal() {
    this.modal = '';
  }

}
