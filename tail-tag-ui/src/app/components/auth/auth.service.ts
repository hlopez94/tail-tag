import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginCredentials, SocialCredentials } from './login/login-request';
import { LoginResponse } from './model/login-response';
import { TypedApiResponse } from 'src/app/core/infrastructure/api-response';
import { IAuthService } from './auth.service.interface';
import { SignUpInfo } from './SignUpInfo';

@Injectable({
  providedIn: 'root',
})
export class AuthService<IProfile> implements IAuthService<IProfile> {
  private _isUserLoggedIn = signal<boolean>(false);
  $isUserLoggedIn = this._isUserLoggedIn.asReadonly();

  private _verifiedAccount = signal<boolean | undefined>(undefined);
  $verifiedAccount = computed(() =>
    this._isUserLoggedIn() ? this._verifiedAccount() : undefined
  );

  private _scopes = signal<string[] | undefined>(undefined);
  $scopes = computed(() =>
    this._isUserLoggedIn() ? this._scopes() : undefined
  );

  private _profileInfo = signal<IProfile | undefined>(undefined);
  $profileInfo = computed(() =>
    this._isUserLoggedIn() ? this._profileInfo() : undefined
  );

  constructor(private _httpClient: HttpClient) {
    var token = localStorage.getItem('token');
    if (token) {
      this.setearToken(token);
    }
  }
  signup(signUpForm: SignUpInfo): Promise<true> {
    throw new Error('Method not implemented.');
  }

  async verifyAccountMail(verifyEmailToken: string): Promise<boolean> {
    var uri = `${environment.apiUrl}/user/verify-email-account`;
    console.log(uri);
    return (
      await firstValueFrom(
        this._httpClient.post<TypedApiResponse<boolean>>(uri, verifyEmailToken)
      )
    ).data;
  }

  async getProfile(): Promise<void> {
    var uri = `${environment.apiUrl}/user/profile`;
    await firstValueFrom(this._httpClient.get<TypedApiResponse<IProfile>>(uri));
  }

  async updateProfile(perfil: IProfile): Promise<boolean> {
    var uri = `${environment.apiUrl}/user/profile`;
    return await firstValueFrom(this._httpClient.put<boolean>(uri, perfil));
  }

  async login(request: LoginCredentials | SocialCredentials): Promise<boolean> {
    const uri: string = `${environment.apiUrl}/user/login`;
    var res = await firstValueFrom(
      this._httpClient.post<TypedApiResponse<LoginResponse>>(uri, request)
    );

    if (res.ok) {
      this.setearToken(res.data.jwt);
    } else {
      this.limpiarToken();
      throw Error(res.reasonText);
    }

    return res.ok;
  }

  public async logout() {
    this.limpiarToken();
  }

  public isUserLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }
  private limpiarToken() {
    localStorage.removeItem('token');
    this._isUserLoggedIn.set(false);
  }

  private setearToken(token: string) {
    if (!this.tokenExpired(token)) {
      localStorage.setItem('token', token);
      this._isUserLoggedIn.set(true);
      this.programarVencimientoToken(token);
    } else {
      this.limpiarToken();
    }
  }

  private programarVencimientoToken(token: string) {}

  private tokenExpired(token: string): boolean {
    if (token && token.split('.')[1]) {
      const expiryInSeconds = JSON.parse(atob(token.split('.')[1])).exp;
      return Math.floor(new Date().getTime() / 1000) >= expiryInSeconds;
    }
    return false;
  }
}


