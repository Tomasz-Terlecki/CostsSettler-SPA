import { KeycloakTokenParsed } from "keycloak-js";
import { Charge } from "./charge.model";
import { appId } from "../constants/user.constants";
import { BaseModel } from "./base.model";

/**
 * Represents user domain model.
 */
export class User extends BaseModel {
  /** User username. */
  username: string;
  /** User first name. */
  firstName: string;
  /** User last name. */
  lastName: string;
  /** User email address. */
  email: string;
  /** User charges. */
  charges: Array<Charge> | undefined;
  
  /**
   * Creates new user model instance.
   */
  constructor() {
    super();
    this.username = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
  }

  /**
   * Creates new User from token data.
   * @param token token to parse.
   * @returns new User model.
   */
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