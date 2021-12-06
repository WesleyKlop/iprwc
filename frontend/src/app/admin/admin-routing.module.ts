import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminLayoutComponent } from './admin-layout/admin-layout.component'
import { IndexPageComponent } from './products/index-page/index-page.component'
import { ShowPageComponent } from './products/show-page/show-page.component'
import { CreatePageComponent } from './products/create-page/create-page.component'
import { EditPageComponent } from './products/edit-page/edit-page.component'

const routes: Routes = [
  {
    path: 'products',
    component: IndexPageComponent,
  },
  {
    path: 'products/create',
    component: CreatePageComponent,
  },
  {
    path: 'products/:id',
    component: ShowPageComponent,
  },
  {
    path: 'products/:id/edit',
    component: EditPageComponent,
  },
]

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: routes,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
