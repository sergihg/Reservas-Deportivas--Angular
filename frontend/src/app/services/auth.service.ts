import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private api = 'http://localhost:8081';

  private _user: WritableSignal<User> = signal({name:'',email:'',role:'',_id:''});
  user = this._user.asReadonly();


  onLogin(obj : any) {
    return this.http.post(this.api+'/auth/login',obj);
  }
  onLogout() {

    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  getRole() {
    return this.http.get<{ role: string }>(this.api + '/auth/role').pipe(
        map(res => res?.role ?? 'guest'),
      );
  }
  
  getUser() {
    this.http.get<User>(this.api+"/auth/user").subscribe(
      {
        next: (data: User) => {
          this._user.set(data);
        },
        error: (error) => {
          console.log("Error fetching user info: ", error);
        }
      }
    )
  }

  isAuthenticated() {
    return this.http.get(this.api + '/auth/check').pipe(
      map((data: any) => {
        if (data && !data['logged']) {
          localStorage.clear()
        }
        return !!data && !!data['logged'];
      }),
      catchError(() => of(false))
    );
  }

  hasRole(role: String) {
    return this.getRole().pipe(map(realRole => realRole === role));
  }

  getAuthToken() {
    const token = localStorage.getItem('token')?? '';
    return token;
  }
  
}
