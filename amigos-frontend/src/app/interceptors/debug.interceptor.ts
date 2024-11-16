import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class DebugInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptando requisição:', req);

    return next.handle(req).pipe(
      tap((event) => {
        console.log('Resposta recebida:', event);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro na requisição:', error);
        return throwError(error);
      })
    );
  }
}
