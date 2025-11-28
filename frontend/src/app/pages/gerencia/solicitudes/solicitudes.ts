import { Component, signal, Signal } from '@angular/core';
import { SolicitudService } from '../../../services/solicitud.service';
import { Solicitud } from '../../../interfaces/solicitud';

@Component({
  selector: 'app-solicitudes',
  imports: [],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.css'
})
export class GerenciaSolicitudes {
  solicitudes! : Signal<Solicitud[]>;
  constructor( private solicitudService: SolicitudService) {
    this.solicitudService.fetchSolicitudes();
    this.solicitudes = this.solicitudService.solicitudes;
  }

  accept(id:string) {
    this.solicitudService.accept(id);
  }
  reject(id:string) {
    this.solicitudService.reject(id);
  }


}
