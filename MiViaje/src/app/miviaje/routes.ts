import { Routes } from '@angular/router';
//import { leavePageGuard } from '../guards/leave-page.guard';
//import { restaurantIdGuard } from './guards/restaurant-id.guard';
//import { restaurantResolver } from './resolvers/restaurant.resolver';

export const MIVIAJE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(
      (m) => m.HomeComponent
    ),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./contacto/contacto.component').then(
      (m) => m.ContactoComponent
    ),
  },
  {
    path: 'formulario-viaje',
    loadComponent: () => import('./viaje-form/viaje-form.component').then(
      (m) => m.ViajeFormComponent
    ),
  },
  {
    path: 'perfil',
    loadComponent: () => import('./profile/profile.component').then(
      (m) => m.ProfileComponent
    ),
  },
  {
    path: 'benicassim',
    loadComponent: () => import('./benicassim-component/benicassim-component.component').then(
      (m) => m.BenicassimComponentComponent
    ),
  },
  {
    path: 'alcossebre',
    loadComponent: () => import('./alcossebre-component/alcossebre-component.component').then(
      (m) => m.AlcossebreComponentComponent
    ),
    //canDeactivate: [leavePageGuard],
  },
  {
    path: 'peñiscola',
    loadComponent: () => import('./peniscola-component/peniscola-component.component').then(
      (m) => m.PeniscolaComponentComponent
    ),
    // canDeactivate: [leavePageGuard],
    // canActivate: [restaurantIdGuard],
    // resolve: {
    //   restaurant: restaurantResolver,
    // }
  },
  {
    path: 'castellon',
    loadComponent: () => import('./castellon-component/castellon-component.component').then(
      (m) => m.CastellonComponentComponent
    ),
    // canActivate: [restaurantIdGuard],
    // resolve: {
    //   restaurant: restaurantResolver,
    // },
  },
  {
    path: 'comentarios',
    loadComponent: () => import('./comentarios/comentarios.component').then(
      (m) => m.ComentariosComponent
    ),
    // canActivate: [restaurantIdGuard],
    // resolve: {
    //   restaurant: restaurantResolver,
    // },
  },
];
