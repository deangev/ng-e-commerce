import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from 'src/app/services/admin/admin.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';

@Component({
  selector: 'app-edit-nav',
  templateUrl: './edit-nav.component.html',
  styleUrls: ['./edit-nav.component.css']
})
export class EditNavComponent implements OnInit {

  constructor(public adminService: AdminService, public productService: ProductsService, private sanitizer: DomSanitizer, public sidenavService: SidenavService, public loaderService: LoaderService) { }

  ngOnInit(): void {
  }
  file: any = null;
  isImageChanged: boolean = false

  async handleCreate() {
    this.loaderService.handleAdmin()

    if (this.isImageChanged) {
      await this.adminService.uploadImage(this.file)
      this.isImageChanged = false
    }
    await this.adminService.handleCreateProduct()
    this.loaderService.handleAdmin()

    this.file = null
    this.sidenavService.toggleNav(true)
  }

  onSelect(event: any) {
    const file = event.addedFiles[0];
    this.adminService.imagePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
    if (this.adminService.isEditMode) this.adminService.uploadImage(file)

    this.file = file
    this.isImageChanged = true
  }

  async handleEditProduct() {
    this.loaderService.handleAdmin()

    await this.adminService.handleEditProduct()
    this.sidenavService.toggleNav(true)
    this.loaderService.handleAdmin()

  }

}
