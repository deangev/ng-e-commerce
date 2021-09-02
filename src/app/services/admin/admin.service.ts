import { Injectable } from '@angular/core';
import Product from 'src/app/models/Product';
import { ApiService } from '../api';
import { LoaderService } from '../loader/loader.service';
import { ProductsService } from '../products/products.service';
import { SettingsService } from '../settings.service';
import { SidenavService } from '../sidenav/sidenav.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  file: string | ArrayBuffer | null = null
  fileUrl: string = ''

  product: Product = new Product()
  productClone: Product | null = { ...this.product }
  isEditMode: boolean = false
  imagePreview: any = null
  isEdited: boolean = false

  constructor(private api: ApiService, public setting: SettingsService, private productsService: ProductsService, private sidenavService: SidenavService, public loaderService: LoaderService) { }

  async handleCreateProduct() {
    try {
      const { name, categoryId, price, image } = this.product

      const productRes = await this.api.createPostService(this.setting.baseUrl + '/admin/create', { name, categoryId, price, image }) as Product
      this.productsService.products = [...this.productsService.products, productRes]
      this.product = new Product()
      this.imagePreview = null
    } catch (err) {
      console.error(err);
    }
  }
  async handleEditProduct() {
    try {
      const { _id, categoryId, name, price, image } = this.product

      await this.api.createPostService(this.setting.baseUrl + '/admin/edit', {
        productId: _id,
        categoryId,
        name,
        price,
        image
      })
      this.isEdited = true
      this.addProduct()
    } catch (err) {
      console.error(err);
    }
  }

  editProduct(product: Product) {
    this.imagePreview = null
    this.product = product
    this.productClone = { ...product }
    this.isEdited = false
    this.isEditMode = true
    if (!this.sidenavService.open) this.sidenavService.toggleNav(true)
  }

  addProduct() {
    if (!this.isEdited) {
      this.productsService.resetProduct(this.productClone as Product)
    }
    this.product = new Product()
    this.productClone = null
    this.isEditMode = false
    this.imagePreview = null
    if (!this.sidenavService.open) this.sidenavService.toggleNav(true)
  }

  cancelEditProduct() {
    this.addProduct()
  }

  async uploadImage(file: any) {
    try {
      const image = Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
      const reader = new FileReader();
      reader.readAsDataURL(image);

      const upload = (): Promise<string> => new Promise((resolve, reject) => {
        reader.onloadend = async () => {
          const imageRes = await this.api.createPostService(this.setting.baseUrl + '/admin/image', JSON.stringify({ data: reader.result })) as { url: string }
          return resolve(imageRes.url)
        }
      })

      this.product.image = await upload();
    } catch (err) {
      console.error(err)
    }
  }

  async handleDeleteProduct(productId: string) {
    await this.api.createPostService(this.setting.baseUrl + '/admin/delete', { productId })
    this.productsService.handleDeleteProduct(productId)
  }
}
