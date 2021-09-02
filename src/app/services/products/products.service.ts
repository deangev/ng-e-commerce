import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Cart from 'src/app/models/Cart';
import Category from 'src/app/models/Category';
import Product from 'src/app/models/Product';
import { ApiService } from '../api';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { SettingsService } from '../settings.service';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  categories: Category[] = []
  products: Product[] = []
  isLoading: boolean = false

  constructor(private api: ApiService, public setting: SettingsService, public router: Router, private cartService: CartService, private authService: AuthService) { }

  async getAllCategories() {
    this.categories = await this.api.createGetService(this.setting.baseUrl + '/categories') as Category[]
    this.getProductsByCategory(this.categories[0]._id)
  }

  async getProductsByCategory(categoryId: string) {
    this.isLoading = true
    const productsRes = await this.api.createGetService(this.setting.baseUrl + '/products/?categoryId=' + categoryId) as Product[]

    const cart = await this.cartService.getCart(this.authService.userData.id) as Cart

    setTimeout(() => {
      this.products = productsRes.map((product: Product) => {
        const productToEdit = cart?.products.find((p: Product) => p._id === product._id);

        return {
          ...product,
          quantity: productToEdit?.quantity || 1,
          isAdded: !!productToEdit
        }
      })
      this.isLoading = false
    }, 290)
  }

  updateProducts(product: Product, quantity: number) {
    this.products = this.products.map(p => {
      if (p._id !== product._id) return p
      return {
        ...p,
        quantity
      }
    })
  }

  async handleSearch(value: string) {
    try {
      this.isLoading = true
      const productsRes = await this.api.createGetService(this.setting.baseUrl + '/products/search/?q=' + value) as Product[]
      this.products = productsRes.map(product => {
        const productToEdit = this.cartService.cart?.products.find((p: any) => p._id === product._id);
        return {
          ...product,
          quantity: productToEdit?.quantity || 1,
          isAdded: !!productToEdit
        }
      })
    } catch (err) {
      console.error(err)
    } finally {
      setTimeout(() => {
        this.isLoading = false
      }, 200);
    }
  }

  resetProduct(product: Product) {
    this.products = this.products.map(p => {
      if (p._id !== product._id) return p
      return product
    })
  }

  handleDeleteProduct(productId: string) {
    this.products = this.products.filter(product => product._id !== productId)
  }
}
