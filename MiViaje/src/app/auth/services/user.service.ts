import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { User, UserLogin } from '../interfaces/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import {
  TokenResponse,
  UserResponse,
  UsersResponse,
} from '../interfaces/responses';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http
      .post<UserResponse>('auth/logina', user)
      .pipe(map((resp) => resp.user));
  }
  updateUser(user: User): Observable<User> {
    return this.http.post<User>('auth/actualizausuario', user);

  }

  getUsuario(email: string,contrasena: string): Observable<User> {
    const body = { email };
    return this.http.get<User>('auth/loginu', { params: { email,contrasena } });
  }

  login(user: UserLogin): Observable<User> {
    return this.http.post<User>('auth/loginu', user)
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  // getUser(): any {
  //   const userJson = localStorage.getItem('user');
  //   return userJson ? JSON.parse(userJson) : null;
  // }
}
