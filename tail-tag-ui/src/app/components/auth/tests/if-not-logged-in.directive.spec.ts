import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement, Inject } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AUTH_SVC, IAuthService } from '../auth.service.interface';
import { MockAuthService } from '../auth.service.mock';
import { IProfile } from '../model/profile';
import { IfNotLoggedInDirective } from '../directives/if-not-logged-in.directive';

@Component({
  standalone: true,
  imports: [IfNotLoggedInDirective],
  template: `
    <div ifNotLoggedIn>Visible when logged in</div>
  `,
})
class TestComponent {
  constructor(@Inject(AUTH_SVC) private _authSvc: IAuthService<IProfile> ) {}

  async login(){
    await this._authSvc.login({username: 'user', password: 'pass'});
  }
}

describe('IfNotLoggedInDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let authService: IAuthService<IProfile>; // Mock service
  let element: DebugElement;

  beforeEach(waitForAsync(() => {
    authService = new MockAuthService<IProfile>();

    TestBed.configureTestingModule({
      imports: [IfNotLoggedInDirective,TestComponent],
      providers: [{ provide: AUTH_SVC, useValue: authService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    element = fixture.debugElement.query(By.directive(IfNotLoggedInDirective));
  });

  it('should show element when not logged in', () => {
    fixture.detectChanges();
    expect(element.nativeElement.style.display).toBe('');
  });

  it('should hide element when logged in', async() => {
    await authService.login({username:'',password:''});
    fixture.detectChanges();
    expect(element.nativeElement.style.display).toBe('none');
  });
});
