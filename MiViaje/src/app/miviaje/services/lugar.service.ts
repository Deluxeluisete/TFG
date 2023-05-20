import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, map, Observable, throwError } from 'rxjs';

import { LugarResponse } from '../interfaces/responses';
import { Lugar } from '../interfaces/lugar';

@Injectable({
  providedIn: 'root',
})
export class LugarService {
  private readonly USERS_REGISTER_URL = 'auth/register';
  private readonly USERS_LOGIN_URL = 'auth/login';
  constructor(private readonly http: HttpClient) {}
  getLugars():any {
    return this.http.get('lugar');
  }
  addLugar(lugar: Lugar): Observable<Lugar> {

    return this.http
      .post<LugarResponse>('lugar', lugar)
      .pipe(map((resp) => resp.lugar));
  }

}
