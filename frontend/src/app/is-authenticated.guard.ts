import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { AuthenticationService } from './api/authentication.service'
import { NotificationService } from './shared/notification/notification.service'

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  private async userIsAuthenticated(): Promise<boolean> {
    return firstValueFrom(this.authService.isAuthenticated$)
  }

  private async can(): Promise<UrlTree | boolean> {
    if (await this.userIsAuthenticated()) {
      console.log('User is authenticated')
      return true
    }

    this.notificationService.failure(
      'Je bent niet ingelogd',
      'Je moet ingelogd zijn om deze pagina te bekijken',
      5000,
    )

    return this.router.createUrlTree(['/'])
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.can()
  }

  public canLoad(route: Route, segments: UrlSegment[]) {
    return this.can()
  }
}
