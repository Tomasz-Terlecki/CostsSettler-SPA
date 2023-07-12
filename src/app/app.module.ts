import { AuthGuard } from './guards/auth-guard';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { ChargeComponent } from './components/charges/charge/charge.component';
import { ChargeListComponent } from './components/charges/charge-list/charge-list.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloakConfig.url,
        realm: environment.keycloakConfig.realm,
        clientId: environment.keycloakConfig.clientId,
      },
      initOptions: {
        onLoad: 'check-sso',
        redirectUri: window.location.href,
        checkLoginIframe: false
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    ChargeComponent,
    ChargeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
