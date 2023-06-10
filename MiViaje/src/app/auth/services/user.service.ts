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
  // getMe(): Observable<User> {
  //   return this.http.get<UserResponse>('users/me').pipe(
  //     map((r) => r.user),
  //     catchError((resp: HttpErrorResponse) =>
  //       throwError(
  //         () =>
  //           `Error getting user. Status: ${resp.status}. Message: ${resp.message}`
  //       )
  //     )
  //   );
  // }
  // getUserFs(id: number): Observable<User> {
  //   if (isNaN(id)) {
  //     return this.http.get<UserResponse>('users/me').pipe(
  //       map((r) => r.user),
  //       catchError((resp: HttpErrorResponse) =>
  //         throwError(
  //           () =>
  //             `Error getting user. Status: ${resp.status}. Message: ${resp.message}`
  //         )
  //       )
  //     );
  //   } else {
  //     return this.http.get<UserResponse>(`${'users'}/${id}`).pipe(
  //       map((r) => r.user),
  //       catchError((resp: HttpErrorResponse) =>
  //         throwError(
  //           () =>
  //             `Error getting user. Status: ${resp.status}. Message: ${resp.message}`
  //         )
  //       )
  //     );
  //   }
  // }
  // editUserProfile(name: string, email: string): Observable<User> {
  //   const profile = {
  //     email: email,
  //     name: name,
  //   };
  //   return this.http
  //     .put<UserResponse>(`/users/me`, profile)
  //     .pipe(map((u) => u.user));
  // }
  // saveAvatar(avatar: string): Observable<User> {
  //   const profile = {
  //     avatar: avatar,
  //   };
  //   return this.http
  //     .put<UserResponse>(`/users/me/avatar`, profile)
  //     .pipe(map((u) => u.user));
  // }
  // savePassword(password: string): Observable<User> {
  //   const profile = {
  //     password: password,
  //   };
  //   return this.http
  //     .put<UserResponse>(`/users/me/password`, profile)
  //     .pipe(map((u) => u.user));
  // }
  // logine(user: UserLogin) {
  //   console.log('adios');
  //   return this.http.post<any>(this.USERS_LOGIN_URL, user).pipe(
  //     tap((response) => {
  //       console.log('adios2');

  //       localStorage.setItem('user', JSON.stringify(response.resultado));
  //     })
  //   );
  // }
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
