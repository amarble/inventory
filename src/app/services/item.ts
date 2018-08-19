import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Item } from '../models/item';
import {AuthService} from './auth';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  apiUrl = this.authService.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<Item[]> {
    return this.http.get(this.apiUrl + '/items')
      .pipe(
        map(res => res as Item[]),
        catchError(this.handleError)
      );
  }

  create(item: Item): Observable<Item> {
    return this.http.post(this.apiUrl + '/items', item)
      .pipe(
        map(res => res as Item),
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

