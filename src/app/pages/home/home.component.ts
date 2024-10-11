import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoaded = false
  user: User | null | undefined

  constructor(
    public authService: AuthService
  ){
    this.authService.user$.subscribe(user =>{
      this.user = user
    })
    this.isLoaded = true
  }
}
