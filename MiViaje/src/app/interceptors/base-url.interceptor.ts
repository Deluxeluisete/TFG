import { HttpInterceptorFn } from "@angular/common/http";
import { isDevMode } from "@angular/core";

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  let serverUrl: string;
  if (isDevMode()) {
    // App in development mode
    serverUrl = 'http://localhost:3000'; // Development server url
  } else {
    // App in production mode
    serverUrl = 'http://localhost:3000'; // Production server url
  }
  const reqClone = req.clone({
    url: `${serverUrl}/${req.url}`,
  });
  return next(reqClone);
};
