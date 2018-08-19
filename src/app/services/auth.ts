import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject(null);

  apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('token')) {
      this.user.next(JSON.parse(sessionStorage.getItem('user')));
    }
  }

  login(email: string, password: string): Observable<boolean> {
    const req = { email: email, password: password };
    return this.http.post(this.apiUrl + '/auth/token', req)
      .pipe(
        map((res: {auth: boolean, user: User, token: string}) => {
          if (res.auth) {
            this.user.next(res.user);
            sessionStorage.setItem('token', res.token );
            sessionStorage.setItem('user', JSON.stringify(res.user));
            return true;
          } else {
            return false;
          }
        }),
        catchError(this.handleError)
      );
  }

  logout(): Observable<boolean> {
    sessionStorage.clear();
    this.user.next(null);
    return of(true);
  }

  isValidResetToken(token: string): Observable<boolean> {
    let params = new HttpParams();
    params = params.append('token', token );
    return this.http.get( this.apiUrl + '/auth/token', {params: params})
      .pipe(
        map( (res: any) => {
          return true;
        }),
        catchError(error => of(false))
      );
  }

  private handleError(error: any) {
    const errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'API error';
    console.error(errMsg);
    return throwError(error);
  }

}

