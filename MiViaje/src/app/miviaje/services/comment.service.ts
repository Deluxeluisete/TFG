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
  private readonly USERS_REGISTER_URL = 'auth/register';
  private readonly USERS_LOGIN_URL = 'auth/login';
  constructor(private readonly http: HttpClient) {}
  getComentarios():any {
    return this.http.get('comentario');
  }
  addComment(comment: Comentario): Observable<Comentario> {
    console.log("llega1")
    console.log(comment.mensaje)
    console.log(comment.tematica)
    return this.http
      .post<ComentarioResponse>('comentario', comment)
      .pipe(map((resp) => resp.comentario));
  }

}
