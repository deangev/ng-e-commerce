import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isAuthLoading: boolean = false
  isAdminLoading: boolean = false
  isPaymentLoading: boolean = false
  constructor() { }

  handleAuth() {
    this.isAuthLoading = !this.isAuthLoading
  }

  handleAdmin() {
    this.isAdminLoading = !this.isAdminLoading
  }

  handlePayment() {
    this.isPaymentLoading = !this.isPaymentLoading
  }

  handleError() {
    if (this.isAuthLoading) this.isAuthLoading = false
    if (this.isAdminLoading) this.isAdminLoading = false
    if (this.isPaymentLoading) this.isPaymentLoading = false
  }
}
