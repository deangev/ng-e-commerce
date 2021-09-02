import { Component, Input, OnInit } from '@angular/core';
import Product from 'src/app/models/Product';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  @Input() product: Product = new Product();

  isAdded: boolean = false
  addedProducts: number = 1
  editedQuantity: number = 0
  isLoading: boolean = false

  constructor(public cartService: CartService, public authService: AuthService, public adminService: AdminService) { }

  ngOnInit(): void {
    this.editedQuantity = this.product.quantity
  }

  handleQuantity(event: Event) {
    const inputEl = event.target as HTMLInputElement
    const value = Number(inputEl.value)
    if (value < 1) this.editedQuantity = 1
    else this.editedQuantity = value
  }

  handleQuantityClick(isAdd: number) {
    if (isAdd) this.editedQuantity++
    else if (this.editedQuantity !== 1) this.editedQuantity--
  }

  addToCart() {
    if (this.isAdded) return
    this.addedProducts = this.editedQuantity
    const isProductExist = this.cartService.cart.products.some(p => p._id === this.product._id)
    if (isProductExist) this.cartService.editQuantity(this.product, this.addedProducts)
    else {
      this.product.quantity = this.addedProducts
      this.cartService.addToCart(this.product)
    }
    this.isAdded = true
    setTimeout(() => {
      this.isAdded = false
      this.product.isAdded = true
    }, 3000);
  }

  async handleDeleteProduct(id: string) {
    this.isLoading = true
    await this.adminService.handleDeleteProduct(id)
    this.isLoading = false
  }
}
