import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputGroupComponent } from './input-group/input-group.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonComponent } from './button/button.component';
import { FileUploadComponent } from './file-upload/file-upload.component'

@NgModule({
  declarations: [InputGroupComponent, ButtonComponent, FileUploadComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputGroupComponent, ButtonComponent, FileUploadComponent],
})
export class SharedModule {}
