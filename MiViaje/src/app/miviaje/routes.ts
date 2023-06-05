import { Routes } from '@angular/router';

export const MIVIAJE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(
      (m) => m.HomeComponent
    ),
  },
  {
    path: 'editar-perfil',
    loadComponent: () => import('../auth/register/register.component').then(
      (m) => m.RegisterComponent
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
  },
  {
    path: 'peñiscola',
    loadComponent: () => import('./peniscola-component/peniscola-component.component').then(
      (m) => m.PeniscolaComponentComponent
    ),
  },
  {
    path: 'castellon',
    loadComponent: () => import('./castellon-component/castellon-component.component').then(
      (m) => m.CastellonComponentComponent
    ),

  },
  {
    path: 'comentarios/:tematica',
    loadComponent: () => import('./comentarios/comentarios.component').then(
      (m) => m.ComentariosComponent
    ),

  },
  {
    path: 'addLugar',
    loadComponent: () => import('./add-lugar/add-lugar.component').then(
      (m) => m.AddLugarComponent
    ),

  },
  {
    path: 'verLugar',
    loadComponent: () => import('./ver-lugar/ver-lugar.component').then(
      (m) => m.VerLugarComponent
    ),
  },
  {
    path: 'veritinerarios',
    loadComponent: () => import('./ver-itinerarios/ver-itinerarios.component').then(
      (m) => m.VerItinerariosComponent
    ),
  },
];
