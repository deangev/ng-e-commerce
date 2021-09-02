import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() page: string = '';

  userId: boolean = false
  userRole: number = 1
  constructor(public authService: AuthService, public sidenavService: SidenavService, public router: Router, public cartService: CartService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('auth-token')
    if (token === null || token === '') return
    this.userId = Boolean(this.authService.getUserOnLoad(token))
    this.userRole = this.authService.userData.role
  }

  logout() {
    this.authService.logout()
    this.userId = false
  }

  handleRedirect(page: string) {
    this.router.navigate([page])
  }

}
