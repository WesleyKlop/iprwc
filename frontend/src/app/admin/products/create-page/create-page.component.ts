import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ProductService } from '../../../store/product.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
})
export class CreatePageComponent {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    price: new FormControl(13.37, [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    imageId: new FormControl(null, [Validators.required])
  })

  constructor(private productService: ProductService, private router: Router) {}

  createProduct() {
    this.productService.createProduct(this.form.value).subscribe((data) => {
      this.form.reset()
      return this.router.navigate(['admin', 'products', data.id])
    })
  }
}
