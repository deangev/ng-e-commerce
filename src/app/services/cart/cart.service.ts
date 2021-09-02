import { Injectable } from '@angular/core';
import Cart from 'src/app/models/Cart';
import Product from 'src/app/models/Product';
import { ApiService } from '../api';
import { SettingsService } from '../settings.service';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cart: Cart = new Cart()

  totalPrice: number = 0

  constructor(private api: ApiService, public setting: SettingsService) { }

  calculateTotalPrice() {
    let sum = 0
    this.cart?.products.map(product => {
      sum += product.price * Number(product.quantity)
    })
    this.totalPrice = sum
  }

  async getCart(userId: string): Promise<Cart | undefined> {
    try {
      this.cart = await this.api.createGetService(this.setting.baseUrl + '/cart/?userId=' + userId) as Cart
      this.calculateTotalPrice()
      this.calculateProducts()
      return this.cart
    } catch (err) {
      console.error(err)
      return
    }
  }

  async addToCart(product: Product) {
    try {
      await this.api.createPostService(this.setting.baseUrl + '/cart/addProduct', {
        cartId: this.cart._id,
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: product.quantity
      })
      this.cart.products.push(product);
      this.calculateTotalPrice()
    } catch (err) {
      console.error(err)
    }
  }

  async editQuantity(product: Product, quantity: number) {
    try {
      await this.api.createPostService(this.setting.baseUrl + '/cart/editQuantity', {
        cartId: this.cart._id,
        productId: product._id,
        quantity
      })
      const newCartProducts = this.cart.products.map(p => {
        if (p._id !== product._id) return p
        return {
          ...p,
          quantity
        }
      }) as Product[]
      this.cart.products = newCartProducts
      this.calculateTotalPrice()
    } catch (err) {
      console.error(err)
    }
  }

  async removeProduct(productId: string) {
    try {
      await this.api.createPostService(this.setting.baseUrl + '/cart/removeProduct', {
        cartId: this.cart._id,
        productId
      })
      this.cart.products = this.cart.products.filter(product => product._id !== productId)
      this.calculateTotalPrice()
    } catch (err) {
      console.error(err)
    }
  }

  async clearCart() {
    try {
      await this.api.createPostService(this.setting.baseUrl + '/cart/clear', { cartId: this.cart._id, })
      this.cart.products = []
      this.calculateTotalPrice()
    } catch (err) {
      console.error(err)
    }
  }

  calculateProducts() {
    return this.cart.products.reduce((sum: number, product: Product) => sum + product.quantity, 0)
  }
}
