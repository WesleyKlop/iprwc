import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from '../api/authentication.service'
import { Router } from '@angular/router'
import { ValidationError } from '../errors/ValidationError'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  })

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {
  }

  submitLogin() {
    this.authService.authenticate(this.loginForm.value).subscribe({
      next: async (r) => {
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
      }, error: (err) => {
        if (err instanceof ValidationError) {
          this.loginForm.setErrors({
            invalid: true
          })
        }
      },
    })
  }
}
