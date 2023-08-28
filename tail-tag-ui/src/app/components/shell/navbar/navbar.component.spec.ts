import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { AUTH_SVC } from '../../auth/auth.service.interface';
import { MockAuthService } from '../../auth/auth.service.mock';
import { PerfilUsuario } from '../../user/perfil-usuario';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent,RouterTestingModule],
      providers:[
        {
          provide: AUTH_SVC,
          useClass: MockAuthService<PerfilUsuario>,
        }]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
