import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement, Inject } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IfLoggedInDirective } from '../directives/if-logged-in.directive';
import { AUTH_SVC, IAuthService } from '../auth.service.interface';
import { MockAuthService } from '../auth.service.mock';
import { IProfile } from '../model/profile';

@Component({
  standalone: true,
  imports: [IfLoggedInDirective],
  template: `
    <div ifLoggedIn>Visible when logged in</div>
  `,
})
class TestComponent {
  constructor(@Inject(AUTH_SVC) private _authSvc: IAuthService<IProfile> ) {}

  async login(){
    await this._authSvc.login({username: 'user', password: 'pass'});
  }
}

describe('IfLoggedInDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let authService: IAuthService<IProfile>; // Mock service
  let element: DebugElement;

  beforeEach(waitForAsync(() => {
    authService = new MockAuthService<IProfile>();

    TestBed.configureTestingModule({
      imports: [IfLoggedInDirective,TestComponent],
      providers: [{ provide: AUTH_SVC, useValue: authService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    element = fixture.debugElement.query(By.directive(IfLoggedInDirective));
  });

  it('should hide element when not logged in', () => {
    fixture.detectChanges();
    expect(element.nativeElement.style.display).toBe('none');
  });

  it('should show element when logged in', async() => {
    await authService.login({username:'',password:''});
    fixture.detectChanges();
    expect(element.nativeElement.style.display).toBe('');
  });
});
