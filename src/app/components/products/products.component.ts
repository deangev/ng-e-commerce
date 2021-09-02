import { Component, OnInit } from '@angular/core';
import Category from 'src/app/models/Category';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  activeTab: any = 0
  searchString: string = ''
  productsLength: number[] = new Array(12)

  constructor(public productsService: ProductsService, public cartService: CartService) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.productsService.getAllCategories()
  }

  getProductsByCategory(event: any) {
    const currentTab = this.productsService.categories.find(category => category.name === event.tab.textLabel) as Category;
    this.activeTab = event.index
    this.productsService.getProductsByCategory(currentTab?._id)
  }

  async handleChange(value: string) {
    this.searchString = value
    if (value.length) {
      document.getElementById('products-wrapper')?.classList.add('active-search')
      this.productsLength = new Array(this.productsService.products.length)
    } else {
      document.getElementById('products-wrapper')?.classList.remove('active-search')
      const currentTab = this.productsService.categories[this.activeTab]
      this.getProductsByCategory(({ index: this.activeTab, tab: { textLabel: currentTab.name } }))
      this.productsLength = new Array(12)
    }
    await this.productsService.handleSearch(value)
  }
}
