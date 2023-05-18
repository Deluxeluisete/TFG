import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'miviaje',
    loadChildren: () =>
      import('./miviaje/routes').then((m) => m.MIVIAJE_ROUTES),
  },
  // {
  //   path: 'users',
  //   loadChildren: () =>
  //     import('./profile/routes').then((m) => m.PROFILE_ROUTES),
  // },
  // Default route (empty) -> Redirect to welcome page
  { path: '', redirectTo: '/miviaje/castellon', pathMatch: 'full' },
  // Doesn't match any of the above
  { path: '**', redirectTo: '/miviaje/a' },
];
