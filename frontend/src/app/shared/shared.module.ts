import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { InputGroupComponent } from './input-group/input-group.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonComponent } from './button/button.component'
import { FileUploadComponent } from './file-upload/file-upload.component'
import { NavbarComponent } from './navbar/navbar.component'
import { NavbarItemComponent } from './navbar-item/navbar-item.component'
import { DropdownComponent } from './dropdown/dropdown.component'
import { DropdownItemComponent } from './dropdown-item/dropdown-item.component'
import { NavbarDirective } from './navbar/navbar.directive'
import { FooterComponent } from './footer/footer.component'
import { NotificationComponent } from './notification/notification.component'
import { CurrentNotificationComponent } from './current-notification/current-notification.component'

@NgModule({
  declarations: [
    InputGroupComponent,
    ButtonComponent,
    FileUploadComponent,
    NavbarComponent,
    NavbarItemComponent,
    DropdownComponent,
    DropdownItemComponent,
    NavbarDirective,
    FooterComponent,
    NotificationComponent,
    CurrentNotificationComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    InputGroupComponent,
    ButtonComponent,
    FileUploadComponent,
    NavbarComponent,
    NavbarItemComponent,
    DropdownComponent,
    NavbarDirective,
    FooterComponent,
    NotificationComponent,
    CurrentNotificationComponent,
  ],
})
export class SharedModule {}
