import { KeycloakTokenParsed } from "keycloak-js";
import { Charge } from "./charge.model";
import { appId } from "../constants/user.constants";
import { BaseModel } from "./base.model";

export class User extends BaseModel {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  charges: Array<Charge> | undefined;
  
  constructor() {
    super();
    this.username = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
  }

  static fromToken(token: KeycloakTokenParsed | undefined): User | undefined {
    if (!token) {
      return undefined;
    }

    let user = new User();

    user.id = token[appId] || 'unknown';
    user.username = token['preferred_username'] ?? 'unknown';
    user.firstName = token['given_name'] ?? 'unknown';
    user.lastName = token['family_name'] ?? 'unknown';
    user.email = token['email'] ?? 'unknown';

    return user;
  }
}