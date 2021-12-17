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

  public readonly isAdmin$: Observable<boolean>
  public readonly isAuthenticated$: Observable<boolean>

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.subscribeDataFromToken()

    this.isAdmin$ = this.user$.pipe(map((user) => user?.role === 'ADMIN'))
    this.isAuthenticated$ = this.user$.pipe(
      map((user) => typeof user !== 'undefined'),
    )
  }

  protected fetchCurrentUser(): Promise<User> {
    const observable = this.apiService.get<User>('/users/me').pipe(
      tap((user) => {
        this.user$.next(user)
      }),
    )
    return firstValueFrom(observable)
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
      this.token$.next(undefined)
      return
    }

    const payload = getJwtPayload(savedToken)

    if (!payload) {
      this.token$.next(undefined)
      return
    }

    this.token$.next(savedToken)
  }

  private subscribeDataFromToken() {
    this.token$.subscribe((t) => console.warn('New token:', t))
    // Always store the token in the auth service
    this.token$.subscribe((token) => {
      if (typeof token === 'string') {
        this.apiService.setAuthorization(token)
      } else {
        this.apiService.clearAuthorization()
      }
    })
    // Sync the user stored in the token
    this.token$.subscribe(async (token) => {
      if (typeof token === 'string') {
        const payload = getJwtPayload(token)
        if ('sub' in payload) {
          await this.fetchCurrentUser()
        }
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
}
