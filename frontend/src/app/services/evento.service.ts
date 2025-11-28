import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Evento } from '../interfaces/evento';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private http = inject(HttpClient);
  private api = environment.apiUrl + 'eventos/';

  private _eventos: WritableSignal<Evento[]> = signal([]);
  eventos = this._eventos.asReadonly();
  
  get(horarioID:string) {
    this.http.get<Evento[]>(this.api+horarioID).subscribe(
      {
        next: (data: Evento[]) => {
          this._eventos.set(data);
        },
        error: (error) => {
          console.log("Error creating event: ", error);
        }
      }
    )
  }
  fetch() {
    this.http.get<Evento[]>(this.api).subscribe(
      {
        next: (data: Evento[]) => {
          this._eventos.set(data);
        },
        error: (error) => {
          console.log("Error creating event: ", error);
        }
      }
    )
  }
  fetchTodayEventos() {
    this.http.get<Evento[]>(this.api+'today').subscribe({
      next: (data:Evento[]) => {
        this._eventos.set(data)
      },
      error: (error) => {
        console.log("Error fetching events: ", error);
      }
    })
  }
  
  create(eventData:Evento,horarioID:string) {
      this.http.post<Evento>(this.api+horarioID,eventData).subscribe(
        {
          next: (data: Evento) => {
            window.location.reload();
          },
          error: (error) => {
            console.log("Error creating event: ", error);
          }
        }
      )
  }
  
  delete(id:string) {
      this.http.delete<Evento>(this.api+id).subscribe(
        {
          next: (data: Evento) => {
            window.location.reload();
          },
          error: (error) => {
            console.log("Error creating event: ", error);
          }
        }
      )
  }
}
