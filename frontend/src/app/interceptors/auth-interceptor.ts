import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authToken = inject(AuthService).getAuthToken();
  const newReq = req.clone({
    headers: req.headers.append('Authorization',authToken)
  })
  return next(newReq);
};
