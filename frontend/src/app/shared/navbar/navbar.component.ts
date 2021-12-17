import { Component, ContentChild, Input } from '@angular/core'
import { NavbarDirective } from './navbar.directive'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input()
  title!: string

  isOpen = false

  @ContentChild(NavbarDirective) content!: NavbarDirective
}
