export class UserForListDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
  }
}