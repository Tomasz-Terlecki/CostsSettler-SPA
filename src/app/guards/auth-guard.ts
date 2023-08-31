import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";

/**
 * Guard that checks if user is authenticated.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

  /**
   * Creates new AuthGuard instance
   * @param router ngular router.
   * @param keycloakService Authentication service.
   */
  constructor(
    protected override readonly router: Router,
    protected readonly keycloakService: KeycloakService
  ) {
    super(router, keycloakService);
  }
  
  /**
   * Checks if access is allowed.
   * @param route Angular route representation.
   * @param state Angular router state representation.
   * @returns 'true' if user is authenticated.
   */
  override async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      await this.keycloakService.login({
        redirectUri: window.location.origin + state.url
      })
    }

    return this.authenticated;
  }

}