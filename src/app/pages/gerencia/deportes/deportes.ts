import { Component } from '@angular/core';
import { Ficha } from '../../../components/ficha/ficha';
import { ContenidoDeporte } from '../../../components/contenido-deporte/contenido-deporte';
import { Deporte } from '../../../interfaces/deporte';
import { Modal } from '../../../components/modal/modal';
import { AgregarDeporte } from '../../../components/forms/agregar-deporte/agregar-deporte';
import { EditarDeporte } from '../../../components/forms/editar-deporte/editar-deporte';

@Component({
  selector: 'app-gerencia-deportes',
  imports: [ Ficha, ContenidoDeporte, Modal, AgregarDeporte, EditarDeporte ],
  templateUrl: './deportes.html',
  styleUrl: './deportes.css'
})
export class GerenciaDeportes {
  modal:string = '';

  deporteVacio : Deporte = 
  {
    'nombre': '',
    'descripcion': ''
  };
  deporteSeleccionado : Deporte = this.deporteVacio;

  
  deportes : Deporte[] = [
    {
      'nombre': 'Atletismo',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Acondicionamiento',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Baile Latino',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Baile Niñas',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Básquetbol',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Boliche',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Box',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Fisiculturismo',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Frontón',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Fútbol',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Gimnasia',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Karate',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Natación',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Padel',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Patinaje Artíscico',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Racqetbol',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Squash',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Spinning',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Fitness',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Tae Kwon Do',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Tenis',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Triatlón',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'TRX',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Voleibol',
      'descripcion': 'descripcion del deporte'
    },
    {
      'nombre': 'Yoga',
      'descripcion': 'descripcion del deporte'
    },
  ];

  seleccionar(id: string) {
    if (this.deporteSeleccionado.nombre === id)
      this.deporteSeleccionado = this.deporteVacio
    else
      this.deporteSeleccionado = this.deportes.find(d => d.nombre === id) || this.deporteVacio;
  }
  abrirModal(tipo:string) {
    this.modal = tipo;
  }
  cerrarModal() {
    this.modal = '';
  }
}
