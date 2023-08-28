import { Component, Inject, OnInit, effect } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AUTH_SVC, IAuthService } from '../auth.service.interface';
import { IProfile } from '../model/profile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  originUrl: string[] | null = null;
  originParams: Params | null = null;

  constructor(
    @Inject(AUTH_SVC) private _authService: IAuthService<IProfile>,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    effect(() => {
      if (this._authService.$isUserLoggedIn()) this.navigateAfterLogin();
    });
  }

  ngOnInit(): void {
    var queryParams = this._route.snapshot.queryParams;

    if (queryParams['originParams'] && queryParams['originParams'] != '{}')
      this.originParams = JSON.parse(queryParams['originParams']);

    if (queryParams['origin']) this.originUrl = queryParams['origin'];
    else this.originUrl = [''];

  }

  navigateAfterLogin() {
    this._router.navigate(['/'], { relativeTo: null });
  }

  async login() {
    try {
      await this._authService.login(this.loginForm.value);
      this._snackBar.open(
        `Bienvenido ${this._authService.$profileInfo()?.usuario}`,
        undefined,
        {
          duration: 3000,
          panelClass: ['mat-primary'],
        }
      );
    } catch (err: any) {
      switch (err.status) {
        case 0:
          this._snackBar.open('El servidor no responde.', undefined, {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn'],
          });
          break;
        default:
          this._snackBar.open(err.error.errorsText, '', { duration: 3000 });
      }
    }
  }
}
