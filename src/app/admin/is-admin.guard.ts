import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router'
import { AuthenticationService } from '../login/authentication.service'

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthenticationService) {}

  private async can(): Promise<boolean> {
    if (this.authService.isAuthenticated()) {
      return this.authService.isAdmin()
    }
    await this.authService.attemptRestoreSession()
    return this.authService.isAdmin()
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    return this.can()
  }

  public canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    return this.can()
  }
}
