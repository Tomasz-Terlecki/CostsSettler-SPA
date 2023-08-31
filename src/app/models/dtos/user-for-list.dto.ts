/**
 * DTO representing user for list.
 */
export class UserForListDto {
  /** User id. */
  id: string;
  /** User first name. */
  firstName: string;
  /** User last name. */
  lastName: string;
  /** User email address. */
  email: string;

  /**
   * Creates new UserForListDto instance.
   */
  constructor() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
  }
}