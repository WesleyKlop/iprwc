import { Component, ContentChild, Input } from '@angular/core'
import { NavigationStart, Router } from '@angular/router'
import { filter } from 'rxjs'
import { NavbarDirective } from './navbar.directive'

const filterNavigationStart = (event: any): event is NavigationStart => {
  return event instanceof NavigationStart
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(router: Router) {
    router.events.pipe(filter(filterNavigationStart)).subscribe(() => {
      this.isOpen = false
    })
  }

  @Input()
  title!: string

  isOpen = false

  @ContentChild(NavbarDirective)
  content!: NavbarDirective
}
