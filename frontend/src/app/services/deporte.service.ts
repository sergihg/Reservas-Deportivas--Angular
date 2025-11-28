import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Deporte } from '../interfaces/deporte';

@Injectable({
  providedIn: 'root'
})
export class DeporteService {
  private http = inject(HttpClient);
  private _deportes: WritableSignal<Deporte[]> = signal([]);
  private api = 'http://localhost:8081/deportes/';

  deportes = this._deportes.asReadonly();

  fetchDeportes() {
    this.http.get<Deporte[]>(this.api).subscribe(
      {
        next: (data: Deporte[]) => {
          // console.log("data desde api: ",data);
          this._deportes.set(data);
        },
        error: (error) => {
          console.log("Error fetching deportes: ", error);
        }
      }
    )
  }

 
  update(data: {name:string,description:string},id: string) {
    this.http.put<Deporte>(this.api+id,{
      'description': data['description'],
      'name': data['name']
    }).subscribe(
      {
        next: (data: Deporte) => {
          window.location.reload()
        },
        error: (error) => {
          console.log("Error fetching deportes: ", error);
        }
      }
    )
  }
  create(data: {name:string,description:string}) {
    this.http.post<Deporte>(this.api,{
      'description': data['description'],
      'name': data['name']
    }).subscribe(
      {
        next: (data: Deporte) => {
          window.location.reload()
        },
        error: (error) => {
          console.log("Error fetching deportes: ", error);
        }
      }
    )
  }
  getMySports() {
    this.http.get<Deporte[]>(this.api+'getMySports').subscribe(
      {
        next: (data: Deporte[]) => {
          // console.log("data desde api: ",data);
          this._deportes.set(data);
        },
        error: (error) => {
          console.log("Error fetching deportes: ", error);
        }
      }
    )
  }
  deleteTrainer(id:string) {
    this.http.delete<any>(this.api+'entrenador/'+id).subscribe(
      {
        next: (data: Deporte[]) => {
          // console.log("data desde api: ",data);
          window.location.reload()
        },
        error: (error) => {
          console.log("Error fetching deportes: ", error);
        }
      }
    )
  }
  delete(id:string) {
    this.http.delete<any>(this.api+id).subscribe(
      {
        next: (data: Deporte[]) => {
          // console.log("data desde api: ",data);
          window.location.reload()
        },
        error: (error) => {
          console.log("Error fetching deportes: ", error);
        }
      }
    )
  }
}