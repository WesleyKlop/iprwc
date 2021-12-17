import { Directive, TemplateRef } from '@angular/core'

@Directive({
  selector: '[appNavbar]',
})
export class NavbarDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
