import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutCartComponent } from './components/checkout-cart/checkout-cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { AccountComponent } from './pages/account/account.component';
import { AboutComponent } from './pages/about/about.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { EditNavComponent } from './components/edit-nav/edit-nav.component';
import { AdminHeaderComponent } from './layout/admin-header/admin-header.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ButtonComponent } from './components/button/button.component';
import { SecondaryButtonComponent } from './components/secondary-button/secondary-button.component';

import { MatButtonModule } from '@angular/material/button'
import { MatTabsModule } from '@angular/material/tabs'
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    ProductsComponent,
    CartComponent,
    ProductComponent,
    CartItemComponent,
    CheckoutComponent,
    CheckoutCartComponent,
    PaymentComponent,
    AddToCartComponent,
    SkeletonComponent,
    AccountComponent,
    AboutComponent,
    OrderHistoryComponent,
    EditNavComponent,
    AdminHeaderComponent,
    ButtonComponent,
    SecondaryButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatCheckboxModule,
    MatBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
