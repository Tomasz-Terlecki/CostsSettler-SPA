import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

/**
 * Main Angular component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'CostsSettler';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.setCurrentUser();
  }

  ngOnDestroy(): void {
    this.authService.removeCurrentUser();
  }
  
}
