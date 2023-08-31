import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

/**
 * Component representing application navbar.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  /** User logged to application. */
  currentUser: User | undefined;

  /**
   * Creates new NavbarComponent instance
   * @param authService Auth management service.
   */
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

  /**
   * Checks if user is logged in.
   * @returns 'true' if user is logged in, otherwise 'false'.
   */
  isLoggedIn(): boolean {
    return !!this.authService.isLoggedIn && this.authService.isLoggedIn;
  }

  /**
   * Logs user in.
   */
  async login(): Promise<void> {
    await this.authService.login();
  }

  /**
   * Logs user out.
   */
  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
