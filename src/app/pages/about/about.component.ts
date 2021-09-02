import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AboutService } from 'src/app/services/about/about.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public aboutService: AboutService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.aboutService.getUsersCount()
    this.aboutService.getProductsCount()
    this.aboutService.getOrdersCount()
    let token = localStorage.getItem('auth-token')
    if (!token) return
    const user = await this.authService.getUserOnLoad(token) as any
    if (user.role === 1) this.router.navigate([""])
  }

}
