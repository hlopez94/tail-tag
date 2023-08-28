import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (!token) {
      return next.handle(req);
    }
    const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(headers);
  }
}

export const AuthInterceptorFn : HttpInterceptorFn = (req: HttpRequest<unknown>,
  next: HttpHandlerFn) => { const token = localStorage.getItem('token');
  if (!token) {
    return next(req);
  }
  const headers = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(headers);
}
