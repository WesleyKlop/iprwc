import { Injectable } from '@angular/core'
import { firstValueFrom, Observable, tap } from 'rxjs'
import { User } from '../models'
import { getJwtPayload } from '../utils'
import { ApiService } from './api.service'

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

  public isUser(): boolean {
    return this.user?.role === 'USER'
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

    const payload = getJwtPayload(savedToken)

    if (payload === null) {
      return
    }

    this.apiService.setAuthorization(savedToken)

    if (!('sub' in payload)) {
      return
    }

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
