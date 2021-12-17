import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from '../../api/authentication.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  isAdmin: boolean = false

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin
    })
  }
}
