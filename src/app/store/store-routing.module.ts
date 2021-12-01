import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreLayoutComponent } from './store-layout/store-layout.component'

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([{
    path: '',
    component: StoreLayoutComponent,
    children: routes,
  },
  ])],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
