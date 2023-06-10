import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
 import { baseUrlInterceptor } from './app/interceptors/base-url.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
 import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(SweetAlert2Module.forRoot())
],
}).catch((e) => console.error(e));

