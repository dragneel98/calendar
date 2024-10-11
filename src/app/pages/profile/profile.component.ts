import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthService, User } from '@auth0/auth0-angular';
import { RouterModule } from '@angular/router';
import { DAuth0 } from '../../models/auth0.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  isLoaded = false
  user: DAuth0.UserInfo | null | undefined

  constructor(
    public authService: AuthService
  ){
    this.authService.user$.subscribe(user =>{
      this.user = user as DAuth0.UserInfo
    })
    this.isLoaded = true
  }
}
