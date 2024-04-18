import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string): Observable<boolean> {
    if (username === 'test01' && password === 'test01') {
      return of(true);
    } else {
      console.error()
      return of(false);
    }
  }

}
