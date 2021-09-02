import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { SettingsService } from '../settings.service';
import * as FileSaver from 'file-saver';
import Product from 'src/app/models/Product';
import Order from 'src/app/models/Order';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

  constructor(private api: ApiService, public setting: SettingsService, public router: Router, private cartService: CartService, private loaderService: LoaderService, private authService: AuthService) { }

  async createOrder(orderDetails: object, printReciept: boolean) {
    try {
      this.loaderService.handlePayment()

      const products = this.cartService.cart.products as Product[]
      const createRes = await this.api.createPostService(this.setting.baseUrl + '/orders/create', {
        userId: this.authService.userData.id,
        ...orderDetails,
        products
      }) as Order

      let totalPrice = 0
      products.map((product: Product) => {
        totalPrice += product.quantity * product.price
      })
      if (printReciept) {
        const productsToTxt = products.map((product: any) => `${product.name}(${product.quantity}) - $${product.price * product.quantity}`)
        var blob = new Blob([`${productsToTxt.join('\r\n')}\r\ntotalPrice: $${totalPrice}`], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, createRes.createdAt);
      }
      this.cartService.clearCart()
      this.router.navigate(['account'])

      this.loaderService.handlePayment()
    } catch (err) {
      console.error(err)
    }
  }
}
