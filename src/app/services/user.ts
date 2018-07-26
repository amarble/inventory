import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://pacific-stream-65827.herokuapp.com'; // DEV URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get(this.apiUrl + '/users')
      .pipe(
        map(res => res as User[]),
        catchError(this.handleError)
      );
  }

  create(user: User): Observable<User> {
    return this.http.post(this.apiUrl + '/user', user)
      .pipe(
        map(res => res as User),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    const errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'API error';
    console.error(errMsg);
    return throwError(error);
  }

}

