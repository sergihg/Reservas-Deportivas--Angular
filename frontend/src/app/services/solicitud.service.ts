import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Solicitud } from '../interfaces/solicitud';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private http = inject(HttpClient);
  private api = environment.apiUrl +'solicitudes/';
  
  private _solicitudes: WritableSignal<Solicitud[]> = signal([]);
  solicitudes = this._solicitudes.asReadonly();


  fetchSolicitudes() {
    this.http.get<Solicitud[]>(this.api).subscribe(
      {
        next: (data: Solicitud[]) => {
          this._solicitudes.set(data)
        },
        error: (error) => {
          console.log("Error fetching deportes: ", error);
        }
      }
    )
  }

  createSolicitud(data: Solicitud) {
    this.http.post<Solicitud>(this.api,data).subscribe(
      {
        next: (data: Solicitud) => {
          window.location.href = '/login'
        },
        error: (error) => {
          console.log("Error creating request: ", error);
        }
      }
    )
  }
  accept(id:string) {
    this.http.put<Solicitud>(this.api+'accept/'+id,{}).subscribe(
      {
        next: (data: Solicitud) => {
          window.location.reload()
        },
        error: (error) => {
          console.log("Error creating request: ", error);
        }
      }
    )
  }
  reject(id:string) {
    this.http.put<Solicitud>(this.api+'reject/'+id,{}).subscribe(
      {
        next: (data: Solicitud) => {
          window.location.reload()
        },
        error: (error) => {
          console.log("Error creating request: ", error);
        }
      }
    )
  }
  
}
