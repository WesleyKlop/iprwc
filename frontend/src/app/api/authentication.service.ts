import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  BehaviorSubject,
  defaultIfEmpty,
  filter,
  firstValueFrom,
  map,
  Observable,
  Observer,
  Subject,
  tap,
} from 'rxjs'
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
  protected token$ = new BehaviorSubject<string | undefined>(undefined)

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.token$.subscribe((token) => {
      if (token) apiService.setAuthorization(token)
      else apiService.clearAuthorization()
    })
  }

  public subscribeAuthChanges(handler?: (value: User | undefined) => void) {
    return this.token$
      .pipe(map((token) => (token ? this.user : undefined)))
      .subscribe(handler)
  }

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

  private pullSavedToken(): Promise<string | null> {
    const observable = this.route.queryParamMap.pipe(
      // We first check if the URL contains the token query parameter
      filter((params) => params.has('token')),
      map((params) => params.get('token')),
      tap(() => {
        return this.router.navigate([], {
          queryParams: { token: null },
          queryParamsHandling: 'merge',
        })
      }),
      // Else we fall back to the localStorage.
      defaultIfEmpty(localStorage.getItem('app.jwt')),
    )
    return firstValueFrom(observable)
  }

  public async attemptRestoreSession(): Promise<User | undefined> {
    console.log('Attempting to restore session')
    const savedToken = await this.pullSavedToken()
    if (!savedToken) {
      return
    }

    const payload = getJwtPayload(savedToken)

    if (payload === null) {
      return
    }

    this.token$.next(savedToken)

    if (!('sub' in payload)) {
      return
    }

    const observable = this.apiService.get<User>('/users/me').pipe(
      tap({
        next: (user) => {
          this.user = user
          localStorage.setItem('app.jwt', savedToken)
        },
        error: () => {
          this.apiService.clearAuthorization()
        },
      }),
    )

    return firstValueFrom(observable)
  }
}
