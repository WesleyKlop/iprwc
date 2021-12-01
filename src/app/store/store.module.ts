import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { StoreRoutingModule } from './store-routing.module'
import { StoreLayoutComponent } from './store-layout/store-layout.component'

@NgModule({
  declarations: [StoreLayoutComponent],
  imports: [CommonModule, StoreRoutingModule],
})
export class StoreModule {}
