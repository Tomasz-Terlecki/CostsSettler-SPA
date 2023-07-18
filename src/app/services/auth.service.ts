import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { User } from '../models/user.model';
import { currentUser } from '../constants/user.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private keycloakService: KeycloakService) { }

  get isLoggedIn(): boolean | undefined {
    return this.keycloakService.getKeycloakInstance().authenticated;
  }

  get token(): string | undefined {
    return this.keycloakService.getKeycloakInstance().token;
  }

  get currentUser(): User | undefined{
    var currentUserString = localStorage.getItem(currentUser);

    if (!currentUserString) {
      return undefined;
    }

    return JSON.parse(currentUserString) as User;
  }

  private set currentUser(value: User | undefined) {
    if (value === undefined) {
      localStorage.removeItem(currentUser);
    }

    localStorage.setItem(currentUser, JSON.stringify(value));
  }

  async login(): Promise<void> {
    await this.keycloakService.login()
      .then(() => {
        this.setCurrentUser();
      });
  }

  async logout(): Promise<void> {
    await this.keycloakService.logout()
      .then(() => {
        this.removeCurrentUser();
      });
  }

  setCurrentUser() {
    const token = this.keycloakService.getKeycloakInstance().tokenParsed;
    this.currentUser = User.fromToken(token);
  }

  removeCurrentUser() {
    this.currentUser = undefined;
  }
}
