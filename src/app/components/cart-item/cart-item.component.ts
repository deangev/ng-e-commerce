import { Component, Input, OnInit } from '@angular/core';
import Product from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() item: Product = new Product();

  constructor(public cartService: CartService, public productsServices: ProductsService) { }

  isEditMode: boolean = false
  editedQuantity: number = 0
  currentTotalPrice: number = 0
  ngOnInit(): void {
    this.editedQuantity = this.item.quantity
    this.currentTotalPrice = this.item.quantity
  }

  handleRemoveProduct() {
    this.cartService.removeProduct(this.item._id)
  }

  handleUpdateQuantity() {
    this.cartService.editQuantity(this.item, this.editedQuantity)
    this.productsServices.updateProducts(this.item, this.editedQuantity)
  }

  handleQuantityClick(add: number) {
    if (add) this.editedQuantity++
    else if (this.editedQuantity !== 1) this.editedQuantity--
  }
  handleQuantity(event: Event) {
    const inputEl = event.target as HTMLInputElement
    const value = Number(inputEl.value)
    if (value < 1) this.editedQuantity = 1
    else this.editedQuantity = value
  }

}
