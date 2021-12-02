import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { AuthenticationService } from './authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  submitLogin() {
    this.authService.authenticate(this.loginForm.value).subscribe(async (r) => {
      switch (r.role) {
        case 'ADMIN':
          await this.router.navigate(['/admin'])
          break
        case 'USER':
          await this.router.navigate(['/orders'])
          break
        default:
          console.warn('Auth failed?')
      }
    })
  }
}
