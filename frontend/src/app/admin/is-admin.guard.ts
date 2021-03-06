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
import { AuthenticationService } from '../api/authentication.service'

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  private async userIsAdmin(): Promise<boolean> {
    return firstValueFrom(this.authService.isAdmin$)
  }

  private async can(): Promise<UrlTree | boolean> {
    if (await this.userIsAdmin()) {
      return true
    }
    return this.router.createUrlTree(['/login'])
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
