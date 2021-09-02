import { Injectable } from '@angular/core';
import { ApiService } from '../api';
import { SettingsService } from '../settings.service';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  usersCount: number = 0
  productsCount: number = 0
  ordersCount: number = 0
  constructor(private api: ApiService, private setting: SettingsService) { }

  async getUsersCount(): Promise<void> {
    this.usersCount = await this.api.createGetService(this.setting.baseUrl + '/about/users') as number
  }

  async getProductsCount(): Promise<void> {
    this.productsCount = await this.api.createGetService(this.setting.baseUrl + '/about/products') as number
  }

  async getOrdersCount(): Promise<void> {
    this.ordersCount = await this.api.createGetService(this.setting.baseUrl + '/about/orders') as number
  }
}
