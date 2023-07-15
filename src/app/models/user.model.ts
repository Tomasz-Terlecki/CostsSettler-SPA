import { Charge } from "./charge.model";

export class User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  charges: Array<Charge> | undefined;
  
  constructor() {
    this.id = ''  ;
    this.username = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
  }
}