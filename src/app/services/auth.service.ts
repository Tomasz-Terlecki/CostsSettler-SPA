import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { User } from '../models/user.model';
import { currentUser } from '../constants/user.constants';

/**
 * Service that manages user authentication.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  /**
   * Creates new AuthService instance.
   * @param keycloakService Keycloak service.
   */
  constructor(private keycloakService: KeycloakService) { }

  /** Is any user logged to application. */
  get isLoggedIn(): boolean | undefined {
    return this.keycloakService.getKeycloakInstance().authenticated;
  }

  /** Logged user token. */
  get token(): string | undefined {
    return this.keycloakService.getKeycloakInstance().token;
  }

  /** Current user logged to application */
  get currentUser(): User | undefined{
    var currentUserString = localStorage.getItem(currentUser);

    if (!currentUserString) {
      return undefined;
    }

    return JSON.parse(currentUserString) as User;
  }

  /**
   * Start login flow.
   */
  async login(): Promise<void> {
    await this.keycloakService.login()
      .then(() => {
        this.setCurrentUser();
      });
  }

  /**
   * Log user out.
   */
  async logout(): Promise<void> {
    await this.keycloakService.logout()
      .then(() => {
        this.removeCurrentUser();
      });
  }

  /**
   * Set currently logged user data.
   */
  setCurrentUser() {
    const token = this.keycloakService.getKeycloakInstance().tokenParsed;
    this.currentUser = User.fromToken(token);
  }

  /**
   * Remove current user.
   */
  removeCurrentUser() {
    this.currentUser = undefined;
  }

  private set currentUser(value: User | undefined) {
    if (value === undefined) {
      localStorage.removeItem(currentUser);
    }

    localStorage.setItem(currentUser, JSON.stringify(value));
  }
}
