import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { LugarResponse } from '../interfaces/responses';
import { Lugar } from '../interfaces/lugar';

@Injectable({
  providedIn: 'root',
})
export class LugarService {
  constructor(private readonly http: HttpClient) {}
  //obtiene el listado de lugares
  getLugars():any {
    return this.http.get('lugar');
  }
  //añade un nuevo lugar
  addLugar(lugar: Lugar): Observable<Lugar> {
    return this.http
      .post<LugarResponse>('lugar', lugar)
      .pipe(map((resp) => resp.lugar));
  }
  //borra un lugar de la aplicaicon, solo lo pdran ejecutar los usuarios administradores
  borrarLugar(lugar: Lugar): any {
      return this.http.delete( "lugar/" +lugar.nombre );
    }
}
