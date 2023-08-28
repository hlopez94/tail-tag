import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'unverified-account',
    loadComponent: () =>
      import('./unverified-account/unverified-account.component').then(
        (c) => c.UnverifiedAccountComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then((c) => c.SignupComponent),
  },
  {
    path: 'validate-mail',
    loadComponent: () =>
      import('./validate-account/validate-account.component').then(
        (c) => c.ValidateAccountComponent
      ),
  },
];
