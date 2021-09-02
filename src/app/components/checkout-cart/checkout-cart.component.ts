import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import Cart from 'src/app/models/Cart';
import Product from 'src/app/models/Product';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class CheckoutCartComponent implements OnInit {

  searchString: string = ''
  checkoutProducts: Product[] = []
  searchedProducts: Product[] = []
  userId: string = ''
  isLoading: boolean = true
  constructor(public router: Router, public cartService: CartService, private authService: AuthService) { }

  async ngOnInit(): Promise<string | void> {
    if (this.cartService.cart._id.length) {
      this.checkoutProducts = this.cartService.cart.products as Product[]
      this.searchedProducts = this.cartService.cart.products as Product[]
      this.isLoading = false
    }

    if (!this.authService.userData.id) {
      const userToken = localStorage.getItem('auth-token')
      if (userToken) {
        const user = await this.authService.getUserOnLoad(userToken) as User
        this.userId = user.id
        const cart = await this.cartService.getCart(this.userId) as Cart
        this.checkoutProducts = cart?.products
        this.searchedProducts = cart?.products
        this.isLoading = false
      } else {
        this.router.navigate(['login'])
        return
      }
    }
  }

  handleChange(value: string) {
    this.searchString = value
    const searchedProducts = this.checkoutProducts.filter(product => product.name.toLowerCase().includes(value.trim().toLowerCase())).map(item => {
      let nameHighlight = item.name.replace(
        new RegExp(value, 'gi'),
        match => `<span>${match}</span>`
      )
      
      return {
        ...item,
        name: nameHighlight
      }
    })
    
    this.searchedProducts = searchedProducts;
  }

}
