import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from './api/authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {
    this.authService.attemptRestoreSession().then(() => {
      console.log('session restored')
    })
  }
}
