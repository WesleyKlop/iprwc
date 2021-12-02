import { Component } from '@angular/core'
import { AuthenticationService } from '../../api/authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {
  }

  signOut(): void {
    this.authService.signOut()
    this.router.navigate(['/'])
  }
}
