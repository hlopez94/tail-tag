import { InjectionToken, Signal } from '@angular/core';
import { LoginCredentials, SocialCredentials } from './login/login-request';
import { SignUpInfo } from './SignUpInfo';
import { IProfile } from './model/profile';

export interface IAuthService<IProfile> {
  $isUserLoggedIn: Signal<boolean>;
  $verifiedAccount: Signal<boolean | undefined>;
  $scopes: Signal<string[] | undefined>;
  $profileInfo: Signal<IProfile | undefined>;

  verifyAccountMail(verifyEmailToken: string): Promise<boolean>;
  getProfile(): Promise<void>;
  updateProfile(perfil: IProfile): Promise<boolean>;
  login(request: LoginCredentials | SocialCredentials): Promise<boolean>;
  logout(): Promise<void>;
  signup(signUpForm: SignUpInfo ): Promise<true>;
}

export const AUTH_SVC = new InjectionToken<IAuthService<IProfile>>('AUTH_SVC');
