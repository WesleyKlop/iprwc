import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ProductService } from '../../../store/product.service'
import { ActivatedRoute } from '@angular/router'
import { Uuid } from '../../../models'

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent implements OnInit {
  private productId?: Uuid

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    price: new FormControl(13.37, [Validators.required, Validators.min(1)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    imageId: new FormControl(null, [Validators.required]),
  })

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id']
      this.productService.fetchProduct(this.productId!).subscribe((product) => {
        this.form.patchValue(product!)
        // We store price as an integer but the form should show the float value
        this.form.get('price')?.patchValue(product!.price / 100)
      })
    })
  }

  updateProduct() {
    this.productService
      .updateProduct(this.productId!, this.form.value)
      .subscribe(() => {
        console.log('Product updated')
      })
  }
}
