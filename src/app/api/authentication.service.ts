import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { User } from '../models'
import { firstValueFrom, Observable, tap } from 'rxjs'

interface Credentials {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  protected user?: User

  constructor(private apiService: ApiService) {}

  public isAdmin(): boolean {
    return this.user?.role === 'ADMIN'
  }

  public isAuthenticated(): boolean {
    return this.user !== undefined
  }

  public signOut(): void {
    this.user = undefined
    this.apiService.clearAuthorization()
    localStorage.clear()
  }

  public authenticate(credentials: Credentials): Observable<User> {
    return this.apiService
      .post<User>('/users/login', credentials)
      .pipe(tap((user) => (this.user = user)))
  }

  public async attemptRestoreSession(): Promise<User | undefined> {
    const savedToken = localStorage.getItem('app.jwt')
    if (!savedToken) {
      return
    }

    this.apiService.setAuthorization(savedToken)
    const observable = this.apiService.get<User>('/users/me').pipe(
      tap({
        next: (user) => {
          this.user = user
        },
        error: () => {
          this.apiService.clearAuthorization()
        },
      }),
    )

    return firstValueFrom(observable)
  }
}
