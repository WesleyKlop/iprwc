import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { InputGroupComponent } from './input-group/input-group.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonComponent } from './button/button.component'
import { FileUploadComponent } from './file-upload/file-upload.component'
import { NavbarComponent } from './navbar/navbar.component'
import { NavbarItemComponent } from './navbar-item/navbar-item.component'

@NgModule({
  declarations: [
    InputGroupComponent,
    ButtonComponent,
    FileUploadComponent,
    NavbarComponent,
    NavbarItemComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    InputGroupComponent,
    ButtonComponent,
    FileUploadComponent,
    NavbarComponent,
    NavbarItemComponent,
  ],
})
export class SharedModule {}
