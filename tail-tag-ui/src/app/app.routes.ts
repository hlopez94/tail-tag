import { AUTH_ROUTES } from './components/auth/auth-routing.module';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadComponent: ()=>import('./components/home/home/home.component').then(c=>c.HomeComponent)
  },
  {
    path:'auth',
    children: AUTH_ROUTES
  },
];
