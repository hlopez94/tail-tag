import { Component, Inject, OnInit } from '@angular/core';
import { IfNotLoggedInDirective } from '../directives/if-not-logged-in.directive';
import { RouterLink } from '@angular/router';
import { IfLoggedInDirective } from '../directives/if-logged-in.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { AUTH_SVC, IAuthService } from '../auth.service.interface';
import { IProfile } from '../model/profile';

@Component({
  selector: 'app-auth-dropdown',
  templateUrl: './auth-dropdown.component.html',
  styleUrls: ['./auth-dropdown.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatMenuModule,
    MatCommonModule,
    MatIconModule,
    IfLoggedInDirective,
    IfNotLoggedInDirective
  ]
})
export class AuthDropdownComponent implements OnInit {
  constructor(@Inject(AUTH_SVC) private _authSvc: IAuthService<IProfile> ) {}

  ngOnInit(): void {}

  logout() {
    this._authSvc.logout();
    location.reload();
  }
}
