import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { AdminLayoutComponent } from './admin-layout/admin-layout.component'
import { IndexPageComponent } from './products/index-page/index-page.component'
import { ShowPageComponent } from './products/show-page/show-page.component'

@NgModule({
  declarations: [AdminLayoutComponent, IndexPageComponent, ShowPageComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
