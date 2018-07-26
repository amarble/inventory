import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Truck } from '../models/truck';

@Injectable({
  providedIn: 'root'
})
export class TruckService {
  private apiUrl = 'https://pacific-stream-65827.herokuapp.com'; // DEV URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<Truck[]> {
    return this.http.get(this.apiUrl + '/trucks')
      .pipe(
        map(res => res as Truck[]),
        catchError(this.handleError)
      );
  }

  create(truck: Truck): Observable<Truck> {
    return this.http.post(this.apiUrl + '/truck', truck)
      .pipe(
        map(res => res as Truck),
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

