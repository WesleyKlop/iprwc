import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminLayoutComponent } from './admin-layout/admin-layout.component'
import { IndexPageComponent } from './products/index-page/index-page.component'
import { ShowPageComponent } from './products/show-page/show-page.component'

const routes: Routes = [
  {
    path: 'products',
    component: IndexPageComponent,
  },
  {
    path: 'products/add',
    component: ShowPageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild([{
    path: '',
    component: AdminLayoutComponent,
    children: routes,
  }])],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
