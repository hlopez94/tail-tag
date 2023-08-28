import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AUTH_SVC, IAuthService } from './auth.service.interface';
import { IProfile } from './model/profile';

export const canActivateAuth: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot
) => {
  var _authService : IAuthService<IProfile> = inject(AUTH_SVC);
  var _router = inject(Router);
  if (_authService.$isUserLoggedIn()) {
    var noVerificado: Boolean = _authService.$verifiedAccount() ?? false;
    if (!noVerificado) {
      _router.navigate(['/unverified-account'], {
        queryParams: {
          origin: route.url,
          originParams: JSON.stringify(route.queryParams ?? ''),
        },
        queryParamsHandling: 'merge',
      });
      return false;
    }

    return true;
  } else {
    _router.navigate(['/auth/login'], {
      queryParams: {
        origin: route.url,
        originParams: JSON.stringify(route.queryParams ?? ''),
      },
      queryParamsHandling: 'merge',
    });

    return false;
  }
};
