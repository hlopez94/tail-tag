import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AUTH_SVC } from './components/auth/auth.service.interface';
import { MockAuthService } from './components/auth/auth.service.mock';
import { PerfilUsuario } from './components/user/perfil-usuario';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppComponent,RouterTestingModule],
    providers: [
      {
        provide: AUTH_SVC,
        useClass: MockAuthService<PerfilUsuario>,
      },]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
