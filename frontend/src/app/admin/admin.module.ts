import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { AdminLayoutComponent } from './admin-layout/admin-layout.component'
import { IndexPageComponent } from './products/index-page/index-page.component'
import { ShowPageComponent } from './products/show-page/show-page.component'
import { CreatePageComponent } from './products/create-page/create-page.component'
import { SharedModule } from '../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'
import { EditPageComponent } from './products/edit-page/edit-page.component'

@NgModule({
  declarations: [
    AdminLayoutComponent,
    IndexPageComponent,
    ShowPageComponent,
    CreatePageComponent,
    EditPageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
