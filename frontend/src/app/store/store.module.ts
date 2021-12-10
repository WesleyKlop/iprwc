import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../shared/shared.module'

import { StoreRoutingModule } from './store-routing.module'
import { StoreLayoutComponent } from './store-layout/store-layout.component'
import { ShowPageComponent as ProductShowPage } from './products/show-page/show-page.component'
import { IndexPageComponent } from './index-page/index-page.component'
import { IndexPageComponent as CheckoutPage } from './checkout/index-page/index-page.component'
import { CartOverlayComponent } from './cart-overlay/cart-overlay.component'
import { CartOverlayItemComponent } from './cart-overlay/cart-overlay-item/cart-overlay-item.component'
import { CartOverlayTotalComponent } from './cart-overlay/cart-overlay-total/cart-overlay-total.component'

@NgModule({
  declarations: [
    StoreLayoutComponent,
    ProductShowPage,
    IndexPageComponent,
    CartOverlayComponent,
    CartOverlayItemComponent,
    CartOverlayTotalComponent,
    CheckoutPage,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class StoreModule {}
