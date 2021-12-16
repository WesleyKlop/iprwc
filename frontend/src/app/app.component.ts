import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from './api/authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.attemptRestoreSession().then(() => {
      console.log('session restored')
    })
  }
}
