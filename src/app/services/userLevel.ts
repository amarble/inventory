import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { UserLevel } from '../models/userLevel';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class UserLevelService {
  apiUrl = this.authService.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<UserLevel[]> {
    return this.http.get(this.apiUrl + '/userLevels')
      .pipe(
        map(res => res as UserLevel[]),
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

