import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  // redirect_uri: window.location.origin
  providers:
  [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAuth0({
      domain: 'dev-cpurqrwfpukx5dbo.us.auth0.com',
      clientId: 'tMIVYO1BJgJhhXYDSts73IoHZL07AVje',
      authorizationParams: {
        redirect_uri: "http://localhost:4200/"
      }
    }),
  ],


};
