import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Horario } from '../interfaces/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private http = inject(HttpClient);
  private _horarios: WritableSignal<Horario[]> = signal([]);
  private api = 'http://localhost:8081/horarios/';

  horarios = this._horarios.asReadonly();

  fetchHorarios() {
      this.http.get<Horario[]>(this.api).subscribe(
        {
          next: (data: Horario[]) => {
            // console.log(data)
            this._horarios.set(data);
          },
          error: (error) => {
            this._horarios.set([]);
            console.log("Error fetching horarios: ", error);
          }
        }
      )
  }
  fetch() {
      this.http.get<Horario[]>(this.api+'calendario').subscribe(
        {
          next: (data: Horario[]) => {
            this._horarios.set(data);
          },
          error: (error) => {
            this._horarios.set([]);
            console.log("Error fetching horarios: ", error);
          }
        }
      )
  }
  fetchHorariosDeporte(id: string) {
      this.http.get<Horario[]>(this.api+'deporte/'+id).subscribe(
        {
          next: (data: Horario[]) => {
            // console.log(data)
            this._horarios.set(data);
          },
          error: (error) => {
            this._horarios.set([]);
            console.log("Error fetching horarios: ", error);
          }
        }
      )
  }
  fetchToday() {
      this.http.get<Horario[]>(this.api+'today').subscribe(
        {
          next: (data: Horario[]) => {
            this._horarios.set(data);
          },
          error: (error) => {
            this._horarios.set([]);
            console.log("Error fetching horarios: ", error);
          }
        }
      )
  }
  
  update(data: {time:string,spots:string},id: string) {
    this.http.put<Horario>(this.api+id,{
      'time': data['time'],
      'spots': data['spots']
    }).subscribe(
      {
        next: (data: Horario) => {
          window.location.reload()
        },
        error: (error) => {
            this._horarios.set([]);
          console.log("Error fetching horarios: ", error);
        }
      }
    )
  }
  
  updateDays(data: {day1?: boolean, day2?: boolean, day3?: boolean, day4?: boolean, day5?: boolean},id: string) {
    let days: number[] = [];
    if (data.day1 === true) days.push(1);
    if (data.day2 === true) days.push(2);
    if (data.day3 === true) days.push(3);
    if (data.day4 === true) days.push(4);
    if (data.day5 === true) days.push(5);
    console.log(days)

    this.http.put<Horario>(this.api+'days/'+id,{
      'days': days
    }).subscribe(
      {
        next: (data: Horario) => {
          window.location.reload()
        },
        error: (error) => {
            this._horarios.set([]);
          console.log("Error fetching horarios: ", error);
        }
      }
    )
  }
  create(data: {time: string, spots: number, day1?: boolean, day2?: boolean, day3?: boolean, day4?: boolean, day5?: boolean}) {
    let days: number[] = [];
    if (data.day1 === true) days.push(1);
    if (data.day2 === true) days.push(2);
    if (data.day3 === true) days.push(3);
    if (data.day4 === true) days.push(4);
    if (data.day5 === true) days.push(5);

    this.http.post<Horario>(this.api, {
      time: data.time,
      spots: data.spots,
      days
    }).subscribe(
      {
        next: (data: Horario) => {
          window.location.reload()
        },
        error: (error) => {
            this._horarios.set([]);
          console.log("Error fetching horarios: ", error);
        }
      }
    )
  }
  enroll(id:string) {
    this.http.put<Horario>(this.api+'enroll/'+id,{}).subscribe(
      {
        next: (data:Horario) => {
          // console.log(data)
          window.location.reload()
        },
        error: (error) => {
            this._horarios.set([]);
          console.log("Error enrolling to horario: ",error)
        }
      }
    )
  }
  leave(id:string) {
    this.http.put<Horario>(this.api+'leave/'+id,{}).subscribe(
      {
        next: (data:Horario) => {
          // console.log(data)
          window.location.reload()
        },
        error: (error) => {
            this._horarios.set([]);
          console.log("Error annuling enrollment to horario: ",error)
        }
      }
    )
  }
  getMyHorariosDeporte(id:string) {
    this.http.get<Horario[]>(this.api+'myHorarios/deporte/'+id).subscribe(
      {
        next: (data: Horario[]) => {
          // console.log("data desde api: ",data);
          this._horarios.set(data);
        },
        error: (error) => {
            this._horarios.set([]);
          console.log("Error fetching deportes: ", error);
        }
      }
    )
  }
  delete(id:string) {
    this.http.delete<any>(this.api+id).subscribe(
      {
        next: (data: any) => {
          // console.log("data desde api: ",data);
          window.location.reload()
        },
        error: (error) => {
            this._horarios.set([]);
          console.log("Error fetching deportes: ", error);
        }
      }
    )
  }
}
