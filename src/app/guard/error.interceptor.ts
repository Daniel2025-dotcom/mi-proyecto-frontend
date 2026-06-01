import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        if (isPlatformBrowser(platformId)) {
          alert('Error de conexión: El servidor de datos no responde,esta con el diego');
        } else {
          console.error('[SSR] El Servidor está con el diego.');
        }
      }
      
      return throwError(() => error);
    })
  );
};