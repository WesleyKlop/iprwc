import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { IsAdminGuard } from './admin/is-admin.guard'

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canLoad: [IsAdminGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./store/store.module').then((m) => m.StoreModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
