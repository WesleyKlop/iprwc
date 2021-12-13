import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CartService } from '../../../api/cart.service'
import { CartProduct } from '../../../models'

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css'],
})
export class IndexPageComponent implements OnInit {
  public cartProducts: CartProduct[] = []

  public checkoutForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    paymentMethod: new FormControl('bunq', [Validators.required]),
  })

  paymentMethods: string[] = [
    'ABN AMRO',
    'ASN Bank',
    'bunq',
    'Handelsbanken',
    'ING',
    'Knab',
    'Rabobank',
    'RegioBank',
    'Revolut',
    'SNS',
    'Triodos Bank',
    'Van Lanschot',
  ]

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.products().subscribe((products) => {
      this.cartProducts = products
    })
  }

  public checkout() {}

  get total() {
    return this.cartProducts.reduce(
      (acc, { product, quantity }) => acc + product.price * quantity,
      0,
    )
  }
}
