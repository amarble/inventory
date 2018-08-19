import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = this.authService.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<User[]> {
    return this.http.get(this.apiUrl + '/users')
      .pipe(
        map(res => res as User[]),
        catchError(this.handleError)
      );
  }

  create(user: User): Observable<User> {
    return this.http.post(this.apiUrl + '/users', user)
      .pipe(
        map(res => res as User),
        catchError(this.handleError)
      );
  }

  update(user: User): Observable<User> {
    return this.http.put( this.apiUrl + '/users', user)
      .pipe(
        map( res => res as User),
        catchError(this.handleError)
      );
  }

  requestReset(email: string): Observable<boolean> {
    let params = new HttpParams();
    params = params.append('email', email );
    return this.http.get(this.apiUrl + '/users/resetPassword', {params: params})
      .pipe(
        map( res => true ),
        catchError(this.handleError)
      );
  }

  resetPassword(token: string, password: string): Observable<boolean> {
    const req = { token: token, password: password };
    return this.http.post( this.apiUrl + '/users/resetPassword', req)
      .pipe(
        map( () => true),
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

