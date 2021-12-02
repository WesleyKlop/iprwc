import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputGroupComponent } from './input-group/input-group.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonComponent } from './button/button.component'

@NgModule({
  declarations: [InputGroupComponent, ButtonComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputGroupComponent, ButtonComponent],
})
export class SharedModule {}
