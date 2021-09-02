import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Order from 'src/app/models/Order';
import { ApiService } from '../api';
import { SettingsService } from '../settings.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders: Order[] = []

  constructor(private api: ApiService, public setting: SettingsService, public router: Router) { }

  async getOrders(userId: string) {
    try {
      this.orders = await this.api.createGetService(this.setting.baseUrl + '/orders?userId=' + userId) as Order[]
    } catch (err) {
      console.error(err)
    }
  }
}
