import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { definePreset } from '@primeng/themes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { NoteEffects } from './app/store/effects/note.effect';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { noteReducer } from './app/store/reducers/note.reducer';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{blue.500}',
          contrastColor: '#ffffff',
          hoverColor: '{blue.700}',
          activeColor: '{blue.800}'
        },
        highlight: {
          background: '{blue.600}',
          focusBackground: '{blue.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        },
      },
      dark: {
        primary: {
          color: '{blue.500}',
          contrastColor: '{blue.900}',
          hoverColor: '{blue.400}',
          activeColor: '{blue.300}'
        },
        highlight: {
          background: '{blue.500}',
          focusBackground: '{blue.400}',
          color: '{surface.900}',
          focusColor: '{surface.900}'
        }
      }
    }
  }

})

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),withEnabledBlockingInitialNavigation()),
    importProvidersFrom(BrowserAnimationsModule, ConfirmDialogModule),
    provideHttpClient(withFetch()),
    // provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: false,
        }
      }
    }),
    provideStore({ notes: noteReducer }),
    // provideEffects([NoteEffects]),
    provideStoreDevtools({ maxAge: 25 }),
  ]
};
