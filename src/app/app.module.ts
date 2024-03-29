import { AuthGuard } from './guards/auth-guard';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { ChargeComponent } from './components/charges/charge/charge.component';
import { ChargeListComponent } from './components/charges/charge-list/charge-list.component';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChargesService } from './services/charges.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CircumstanceComponent } from './components/circumstances/circumstance/circumstance.component';
import { CircumstanceListComponent } from './components/circumstances/circumstance-list/circumstance-list.component';
import { CircumstancesService } from './services/circumstances.service';
import { DetailedCircumstanceComponent } from './components/circumstances/detailed-circumstance/detailed-circumstance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';

/**
 * Initializes Keycloak instance on application startup.
 * @param keycloak keycloak service used for auth managment.
 * @returns a function configuring keycloak service instance.
 */
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

/**
 * Main app module.
 */
@NgModule({
  declarations: [
    AppComponent,
    ChargeComponent,
    ChargeListComponent,
    CircumstanceComponent,
    CircumstanceListComponent,
    DetailedCircumstanceComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      extendedTimeOut: 3000,
    })
  ],
  providers: [
    AuthService,
    ChargesService,
    CircumstancesService,
    UsersService,
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
