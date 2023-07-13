import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return !!this.authService.isLoggedIn && this.authService.isLoggedIn;
  }

  async login(): Promise<void> {
    await this.authService.login();
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
