import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { CreateOrderService } from 'src/app/services/createOrder/create-order.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PaymentsService } from 'src/app/services/payments/payments.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  firstName: string = ''
  lastName: string = ''
  city: string = ''
  address: string = ''
  dateToDeliver: string = ''
  creditCard: number | string = ''
  cvc: number | string = ''
  month: string = ''
  year: number = 0
  today: Date = new Date()
  printReceipt: boolean = false
  isLoading: boolean = false

  constructor(private authService: AuthService, private createOrderService: CreateOrderService, public cartService: CartService, public loaderService: LoaderService, public paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.month = this.paymentsService.months[0]
    this.year = this.paymentsService.years[0]
  }

  handleAutoComplete() {
    this.firstName = this.authService.userData.firstName
    this.lastName = this.authService.userData.lastName
    this.city = this.authService.userData.city
    this.address = this.authService.userData.address
  }

  async handlePlaceOrder() {
      this.isLoading = true
      await this.createOrderService.createOrder({
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        city: this.city,
        dateToDeliver: this.dateToDeliver,
        creditCard: this.creditCard,
        cvc: this.cvc,
        month: this.month,
        year: this.year,
      }, this.printReceipt)
      this.isLoading = false
      this.isLoading = false
  }

  handleCreditCard(creditNumbers: number) {
    if (creditNumbers.toString().length > 16) return
    this.creditCard = creditNumbers
  }

  handleCVC(cvc: number) {
    if (cvc.toString().length > 3) return
    this.cvc = cvc
  }

}
