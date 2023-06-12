import { HttpInterceptorFn } from "@angular/common/http";
import { isDevMode } from "@angular/core";

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  let serverUrl: string;
  if (isDevMode()) {
    // App in development mode
    serverUrl = 'http://vps-566481f2.vps.ovh.net'; // Development server url
  } else {
    // App in production mode
    serverUrl = 'http://vps-566481f2.vps.ovh.net'; // Production server url
  }
  const reqClone = req.clone({
    url: `${serverUrl}${req.url}`,
  });
  return next(reqClone);
};
