import { IProfile } from './../model/profile';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AUTH_SVC, IAuthService } from '../auth.service.interface';

@Component({
  selector: 'app-validate-account',
  templateUrl: './validate-account.component.html',
  styleUrls: ['./validate-account.component.scss'],
  standalone: true,
})
export class ValidateAccountComponent implements OnInit {
  constructor(
    @Inject(AUTH_SVC) private _authService: IAuthService<IProfile>,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {}

  async ngOnInit() {
    var params = await firstValueFrom(this._route.queryParams);

    var mailToken = params['token'];

    if (mailToken) {
      this.validarMail(mailToken);
    }
  }

  async validarMail(token: string) {
    var res: boolean = await this._authService.verifyAccountMail(token);

    if (res) {
      this._authService.logout();
      var snackRef = this._snackbar.open(
        'Cuenta Verificada Correctamente. Volve a iniciar Sesión 😉',
        'Iniciar Sesión',
        { duration: 3000 }
      );

      snackRef.onAction().subscribe((_) => {
        this._router.navigate(['login']);
      });
      this._router.navigate(['/']);
    }
  }
}
