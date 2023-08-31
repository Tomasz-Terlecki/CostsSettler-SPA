import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Interceptor that adds token in Authorization header.
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  /**
   * Creates new TokenInterceptor instance.
   * @param authService Service that manages authentication.
   */
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.token;

    if (token) {
      request.headers.append('Authorization', 'Bearer ' + token);
    }

    return next.handle(request)
      .pipe(
        catchError((err) => {
          if (err.status === 401) {
            this.authService.logout();
          }

          return throwError(() => err);
        })
      );
  }
}
