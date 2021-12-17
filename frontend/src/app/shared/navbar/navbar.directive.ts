import { Directive, TemplateRef } from '@angular/core'

@Directive({
  selector: '[app-navbar]',
})
export class NavbarDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
