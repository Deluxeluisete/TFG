import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, map, Observable, throwError } from 'rxjs';

import { ComentarioResponse } from '../interfaces/responses';
import { Comentario } from '../interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private readonly http: HttpClient) {}
  //obtengo los comentarios
  getComentarios():any {
    return this.http.get('comentario');
  }
  //se añade un comentario a la tabla comentarios
  addComment(comment: Comentario): Observable<Comentario> {
    return this.http
      .post<ComentarioResponse>('comentario', comment)
      .pipe(map((resp) => resp.comentario));
  }

}
