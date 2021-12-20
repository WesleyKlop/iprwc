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
import { NotificationService } from '../shared/notification/notification.service'
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
  private readonly _user$ = new ReplaySubject<User | undefined>(1)
  private readonly _token$ = new ReplaySubject<string | undefined>(1)

  public readonly isAdmin$: Observable<boolean>
  public readonly isAuthenticated$: Observable<boolean>

  public readonly user$: Observable<User | undefined>
  public readonly token$: Observable<string | undefined>

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
  ) {
    this.subscribeDataFromToken()

    this.user$ = this._user$.asObservable()
    this.token$ = this._token$.asObservable()

    this.isAdmin$ = this.user$.pipe(map((user) => user?.role === 'ADMIN'))
    this.isAuthenticated$ = this.user$.pipe(
      map((user): user is User => typeof user !== 'undefined'),
    )
  }

  protected fetchCurrentUser(): Promise<User> {
    const observable = this.apiService.get<User>('/users/me').pipe(
      tap((user) => {
        this._user$.next(user)
      }),
    )
    return firstValueFrom(observable)
  }

  public signOut(): void {
    this._token$.next(undefined)
    localStorage.removeItem('app.jwt')
    this.notificationService.info(
      'Uitgelogd',
      'Je bent succesvol uitgelogd',
      3000,
    )
  }

  public authenticate(credentials: Credentials): Observable<User> {
    return this.apiService
      .post<User>('/users/login', credentials)
      .pipe(tap((user) => this._user$.next(user)))
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
      this._token$.next(undefined)
      return
    }

    const payload = getJwtPayload(savedToken)

    if (!payload) {
      this._token$.next(undefined)
      return
    }

    this._token$.next(savedToken)
  }

  private subscribeDataFromToken() {
    // Always store the token in the auth service
    this._token$.subscribe((token) => {
      if (typeof token === 'string') {
        this.apiService.setAuthorization(token)
      } else {
        this.apiService.clearAuthorization()
      }
    })
    // Sync the user stored in the token
    this._token$.subscribe(async (token) => {
      if (typeof token === 'string') {
        const payload = getJwtPayload(token)
        if ('sub' in payload) {
          await this.fetchCurrentUser()
        } else {
          this._user$.next(undefined)
        }
      } else {
        this._user$.next(undefined)
      }
    })
    // Sync localStorage with the token
    this._token$.subscribe((token) => {
      if (typeof token === 'string') {
        localStorage.setItem('app.jwt', token)
      }
    })
  }
}
