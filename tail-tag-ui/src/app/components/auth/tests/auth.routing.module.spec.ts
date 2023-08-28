import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Route } from '@angular/router';
import { AUTH_ROUTES } from '../auth-routing.module';

describe('Auth Routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
  });

  it('should have the correct number of routes', () => {
    expect(AUTH_ROUTES.length).toBe(4); // Adjust the expected number of routes
  });

  it('should have the correct route configuration for /login', () => {
    console.log(AUTH_ROUTES);
    const loginRoute: Route  = AUTH_ROUTES.find(route => route.path === 'login')!;

    expect(loginRoute).toBeTruthy();
    expect(loginRoute!.canActivate).toBeUndefined();
  });
  it('should have the correct route configuration for /signup', () => {
    console.log(AUTH_ROUTES);
    const registerRoute: Route  = AUTH_ROUTES.find(route => route.path === 'signup')!;

    expect(registerRoute).toBeTruthy();
    expect(registerRoute!.canActivate).toBeUndefined();
  });

  // Add more tests for other routes as needed
});
