import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { StoreRoutingModule } from './store-routing.module'
import { StoreLayoutComponent } from './store-layout/store-layout.component'
import { ShowPageComponent } from './products/show-page/show-page.component'
import { IndexPageComponent } from './index-page/index-page.component'

@NgModule({
  declarations: [StoreLayoutComponent, ShowPageComponent, IndexPageComponent],
  imports: [CommonModule, StoreRoutingModule],
})
export class StoreModule {}
