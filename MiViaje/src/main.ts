import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
 import { baseUrlInterceptor } from './app/interceptors/base-url.interceptor';
 import { authInterceptor } from './app/auth/interceptors/base-url.interceptor';
// import { provideArcgisToken } from './app/maps/arcgis-maps.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
     provideHttpClient(withInterceptors([authInterceptor])),
    // provideArcgisToken('AAPKc2940b004f38491b869000328dd73685GNKiJxJwOBscpCvz9Pxpae-LVDdvsqr_p6VDTqAas1Kj7idPwcMZqSc-fuDAY91R'),
    importProvidersFrom(BrowserAnimationsModule),
    // importProvidersFrom(SweetAlert2Module.forRoot())
],
}).catch((e) => console.error(e));

