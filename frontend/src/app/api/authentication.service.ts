import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  firstValueFrom,
  interval,
  map,
  mapTo,
  Observable,
  race,
  ReplaySubject,
  skipWhile,
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
  public readonly user$ = new ReplaySubject<User | undefined>(1)
  public readonly token$ = new ReplaySubject<string | undefined>(1)

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.token$.subscribe((t) => console.warn('New token:', t))
    // Always store the token in the auth service
    this.token$.subscribe((token) => {
      if (typeof token === 'string') {
        apiService.setAuthorization(token)
      } else {
        apiService.clearAuthorization()
      }
    })
    // Sync the user stored in the token
    this.token$.subscribe(async (token) => {
      if (typeof token === 'string') {
        await this.fetchCurrentUser()
      } else {
        this.user$.next(undefined)
      }
    })
    // Sync localStorage with the token
    this.token$.subscribe((token) => {
      if (typeof token === 'string') {
        localStorage.setItem('app.jwt', token)
      }
    })
  }

  protected fetchCurrentUser(): Promise<User> {
    const observable = this.apiService.get<User>('/users/me').pipe(
      tap((user) => {
        this.user$.next(user)
      }),
    )
    return firstValueFrom(observable)
  }

  public isAdmin$(): Observable<boolean> {
    return this.user$.pipe(map((user) => user?.role === 'ADMIN'))
  }

  public isUser$(): Observable<boolean> {
    return this.user$.pipe(map((user) => user?.role === 'USER'))
  }

  public isAuthenticated$(): Observable<boolean> {
    return this.user$.pipe(map((user) => typeof user !== 'undefined'))
  }

  public signOut(): void {
    this.token$.next(undefined)
    localStorage.removeItem('app.jwt')
  }

  public authenticate(credentials: Credentials): Observable<User> {
    return this.apiService
      .post<User>('/users/login', credentials)
      .pipe(tap((user) => this.user$.next(user)))
  }

  private pullSavedToken(): Promise<string | null> {
    const observable = race([
      interval(250).pipe(mapTo(localStorage.getItem('app.jwt'))),
      this.route.queryParamMap.pipe(
        skipWhile((params) => !params.has('token')),
        map((params) => params.get('token')),
        tap(() => {
          return this.router.navigate([], {
            queryParams: { token: null },
            queryParamsHandling: 'merge',
          })
        }),
      ),
    ])
    return firstValueFrom(observable)
  }

  public async attemptRestoreSession() {
    const savedToken = await this.pullSavedToken()
    if (!savedToken) {
      return
    }

    const payload = getJwtPayload(savedToken)

    if (!payload) {
      return
    }

    this.token$.next(savedToken)
  }
}
