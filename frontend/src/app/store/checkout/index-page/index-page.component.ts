import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { CartService } from '../../../api/cart.service'
import { CartProduct } from '../../../models'

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css'],
})
export class IndexPageComponent implements OnInit {
  public cartProducts: CartProduct[] = []
  public total: number = 0

  public checkoutForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    paymentMethod: new FormControl('', [Validators.required]),
  })

  paymentMethods = [
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

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.products().subscribe((products) => {
      this.cartProducts = products
      this.total = products.reduce(
        (total, i) => total + i.product.price * i.quantity,
        0,
      )
    })
  }

  public checkout() {
    this.cartService.checkout(this.checkoutForm.value).subscribe(() => {
      this.cartService.clear()
      return this.router.navigate(['/', 'orders'])
    })
  }
}
