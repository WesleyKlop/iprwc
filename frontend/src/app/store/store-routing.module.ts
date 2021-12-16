import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { IndexPageComponent as CheckoutPage } from './checkout/index-page/index-page.component'
import { IndexPageComponent as ProductIndexPage } from './index-page/index-page.component'
import { ShowPageComponent as ProductShowPage } from './products/show-page/show-page.component'
import { IndexPageComponent as OrderIndexPage } from './orders/index-page/index-page.component'
import { StoreLayoutComponent } from './store-layout/store-layout.component'

const routes: Routes = [
  {
    path: 'products/:id',
    component: ProductShowPage,
  },
  {
    path: 'checkout',
    component: CheckoutPage,
  },
  {
    path: 'orders',
    component: OrderIndexPage,
  },
  {
    path: '',
    component: ProductIndexPage,
  },
]

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StoreLayoutComponent,
        children: routes,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
