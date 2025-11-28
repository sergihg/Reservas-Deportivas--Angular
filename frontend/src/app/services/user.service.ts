import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8081/users/';
  private _users: WritableSignal<User[]> = signal([]);
  users = this._users.asReadonly();

  fetchSocios() {
    this.http.get<User[]>(this.api+'socios').subscribe(
      {
        next: (data: User[]) => {
          this._users.set(data)
        },
        error: (error) => {
          console.log("Error fetching deportes: ", error);
        }
      }
    )
  }

  update(data: {email:string,name:string}, id: string) {
    this.http.put<User>(this.api+id,{
      'email': data['email'],
      'name': data['name']
    }).subscribe(
      {
        next: (data: User) => {
          window.location.reload()
        },
        error: (error) => {
          console.log("Error fetching deportes: ", error);
        }
      }
    )
  }
  create(data: {email:string,name:string,password:string,code?:number},role:string,sport?:string) {

    if(role==='entrenador') {
      this.http.post<User>(this.api,{
        'email': data['email'],
        'name': data['name'],
        'password': data['password'],
        'role':role,
        sport
      }).subscribe(
        {
          next: (data: User) => {
            window.location.reload()
          },
          error: (error) => {
            console.log("Error fetching deportes: ", error);
          }
        }
      )
    } else   
    {
      this.http.post<User>(this.api,{
        'email': data['email'],
        'name': data['name'],
        'password': data['password'],
        'role':role,
        'code':data['code']
      }).subscribe(
        {
          next: (data: User) => {
            window.location.reload()
          },
          error: (error) => {
            console.log("Error fetching deportes: ", error);
          }
        }
      )
    }
  }
  delete(id:string) {
    this.http.delete<User>(this.api+id).subscribe(
      {
        next: (data: User) => {
          window.location.reload()
        },
        error: (error) => {
          console.log("Error fetching deportes: ", error);
        }
      }
    )
  }
  
}
