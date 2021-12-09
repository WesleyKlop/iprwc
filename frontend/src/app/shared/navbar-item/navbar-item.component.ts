import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css'],
})
export class NavbarItemComponent {
  @Input()
  to!: string

  @Input()
  exact: boolean = false
}
