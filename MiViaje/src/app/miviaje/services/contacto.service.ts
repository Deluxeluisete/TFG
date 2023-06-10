import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, map, Observable, throwError } from 'rxjs';

import { ComentarioResponse, ContactoResponse } from '../interfaces/responses';
import { Contacto } from '../interfaces/contacto';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  constructor(private readonly http: HttpClient) {}
  //envia email
  sendMail(contacto: Contacto): Observable<Contacto> {
    return this.http.post<ContactoResponse>('comentario/mail', contacto).pipe(map((resp) => resp.contacto));
  }

}
