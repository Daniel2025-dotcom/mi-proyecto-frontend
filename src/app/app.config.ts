import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors ,withFetch } from '@angular/common/http'; 
import { errorInterceptor } from './guard/error.interceptor'; 
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([errorInterceptor])
    ),
    provideHttpClient(withFetch())
  ]
};