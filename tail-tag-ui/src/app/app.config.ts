import { PerfilUsuario } from './components/user/perfil-usuario';
import { AUTH_SVC } from './components/auth/auth.service.interface';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import { MockAuthService } from './components/auth/auth.service.mock';
import { AuthInterceptorFn } from './components/auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthInterceptorFn])),
    provideClientHydration(),
    {
      provide: AUTH_SVC,
      useClass: MockAuthService<PerfilUsuario>,
    },
  ],
};
