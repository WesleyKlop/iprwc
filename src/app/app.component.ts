import { Component, OnInit } from '@angular/core'
import { Product } from './models'
import { ProductService } from './store/product.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {
  }
}
