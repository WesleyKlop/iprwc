import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { IndexPageComponent } from './index-page/index-page.component'
import { ShowPageComponent } from './products/show-page/show-page.component'
import { StoreLayoutComponent } from './store-layout/store-layout.component'

const routes: Routes = [
  {
    path: 'products/:id',
    component: ShowPageComponent,
  },
  {
    path: '',
    component: IndexPageComponent,
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
