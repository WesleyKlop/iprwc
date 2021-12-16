import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { filter, map, switchMap } from 'rxjs'
import { OrderService } from '../../../api/order.service'
import { Order } from '../../../models'

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css'],
})
export class ShowPageComponent implements OnInit {
  public order?: Order

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter((params) => params.has('id')),
        map((params) => params.get('id') as string),
        switchMap((id) => this.orderService.fetchOrder(id)),
      )
      .subscribe((order) => {
        this.order = order
      })
  }
}
