import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminLayoutComponent } from './admin-layout/admin-layout.component'
import { ProductsPageComponent } from './products-page/products-page.component'

const routes: Routes = [
  {
    path: 'products',
    component: ProductsPageComponent,
  },
]


@NgModule({
  imports: [RouterModule.forChild([{
    path: '',
    component: AdminLayoutComponent,
    children: routes,
  },
  ])],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
