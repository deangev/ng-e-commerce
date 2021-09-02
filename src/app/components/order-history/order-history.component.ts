import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})

export class OrderHistoryComponent implements OnInit {
  userId: string = ''
  isLoading: boolean = true
  constructor(public orderService: OrdersService, public authService: AuthService, public router: Router) { }

  async ngOnInit(): Promise<string | void> {
    let token = localStorage.getItem('auth-token')
    if (token && token !== '') {
      const user = await this.authService.getUserOnLoad(token) as User
      this.userId = user.id
      await this.getOrdersByUserId()
      this.isLoading = false
    }
  }

  async getOrdersByUserId() {
    await this.orderService.getOrders(this.userId)
  }

  formatDate(date: string): string {
    return (new Date(date).toLocaleDateString('en-US'))
  }
}
