import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://pacific-stream-65827.herokuapp.com'; // DEV URL

  constructor(private http: HttpClient) {}

  login(email: String, password: String): Observable<boolean> {
    const req = { email: email, password: password };
    return this.http.post(this.apiUrl + '/auth/token', req)
      .pipe(
        map(res => {
          if (res['auth']) {
            return true;
          } else {
            return false;
          }
        }),
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

