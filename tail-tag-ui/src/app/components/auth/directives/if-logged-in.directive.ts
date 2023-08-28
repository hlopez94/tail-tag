import {
  Directive,
  EffectRef,
  ElementRef,
  Inject,
  effect,
} from '@angular/core';
import { AUTH_SVC, IAuthService } from '../auth.service.interface';
import { IProfile } from '../model/profile';

@Directive({
  selector: '[ifLoggedIn]',
  standalone: true,
})
export class IfLoggedInDirective {
  effect: EffectRef;

  constructor(
    private elementRef: ElementRef<any>,
    @Inject(AUTH_SVC) private authSvc: IAuthService<IProfile>
  ) {
    this.effect = effect(() => {
      this.authSvc.$isUserLoggedIn();
      this.mutate();
    });
  }

  ngOnInit() {
    this.mutate();
  }

  private mutate() {
    if (this.elementRef.nativeElement && this.elementRef.nativeElement.style) {
      this.elementRef.nativeElement.style.display =
        this.authSvc.$isUserLoggedIn() ? '' : 'none';
    }
  }
  ngOnDestroy(): void {
    this.effect.destroy();
  }
}
