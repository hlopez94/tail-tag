import { Injectable, computed, signal } from '@angular/core';
import { LoginCredentials, SocialCredentials } from './login/login-request';
import { IAuthService } from './auth.service.interface';
import { SignUpInfo } from './SignUpInfo';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService<IProfile> implements IAuthService<IProfile> {
  signup(signUpForm: SignUpInfo): Promise<true> {
    throw new Error('Method not implemented.');
  }
  private _isUserLoggedIn = signal<boolean>(false);
  $isUserLoggedIn = this._isUserLoggedIn.asReadonly();

  private _verifiedAccount = signal<boolean | undefined>(undefined);
  $verifiedAccount = computed(() => this._isUserLoggedIn() ? this._verifiedAccount() : undefined
  );

  private _scopes = signal<string[] | undefined>(undefined);
  $scopes = computed(() => this._isUserLoggedIn() ? this._scopes() : undefined
  );

  private _profileInfo = signal<IProfile | undefined>(undefined);
  $profileInfo = computed(() => this._isUserLoggedIn() ? this._profileInfo() : undefined
  );

  async verifyAccountMail(_: string): Promise<boolean> {
    this._verifiedAccount.set(true);
    return true;
  }
  async getProfile(): Promise<void> {
    return;
  }
  async updateProfile(perfil: IProfile): Promise<boolean> {
    this._profileInfo.set(perfil);
    return true;
  }
  async login(_: LoginCredentials | SocialCredentials): Promise<boolean> {
    this._isUserLoggedIn.set(true);
    return true;
  }
  async logout(): Promise<void> {
    this._isUserLoggedIn.set(false);
    return;
  }
}
