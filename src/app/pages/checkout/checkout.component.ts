import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  async ngOnInit() {
    let token = localStorage.getItem('auth-token')
    if (!token) return
    const user = await this.authService.getUserOnLoad(token) as any
    if (user.role === 1) this.router.navigate([""])
  }

}
