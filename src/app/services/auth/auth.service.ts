import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/User';
import { ApiService } from '../api';
import { CartService } from '../cart/cart.service';
import { LoaderService } from '../loader/loader.service';
import { OrdersService } from '../orders/orders.service';
import { SettingsService } from '../settings.service';
import Axios from 'axios'
import { ErrorsService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: User = new User()

  constructor(private api: ApiService, public setting: SettingsService, public router: Router, public cartService: CartService, public loaderService: LoaderService, private errorService: ErrorsService) { }

  checkIsLogin() {
    let token = localStorage.getItem('auth-token')
    if (token === null || token === '') {
      this.router.navigate(["login"])
      return
    }
    return token
  }

  async getUserOnLoad(token: string | null): Promise<User | undefined> {
    const tokenRes = await this.api.createPostService(this.setting.baseUrl + '/users/tokenIsValid', null, { "x-auth-token": token }) as boolean

    if (tokenRes) {
      const userRes = await this.api.createGetService(this.setting.baseUrl + '/users/', { "x-auth-token": token }) as User

      this.userData = userRes;
      this.cartService.getCart(userRes.id)
      return userRes
    }
    return
  }

  async login(username: string, password: string) {
    try {
      this.loaderService.handleAuth()
      const loginRes = await this.api.createPostService(this.setting.baseUrl + "/users/login", { username, password }) as User
      localStorage.setItem('auth-token', loginRes.token)
      this.userData = loginRes;
      this.router.navigate([''])
      this.loaderService.handleAuth()
    } catch (err) {
      console.error(err)
    }
  }

  async checkFirst(): Promise<boolean | void> {
    try {
      this.loaderService.handleAuth()
      const isFirstValid = await this.api.createPostService(this.setting.baseUrl + "/users/register/1", {
        username: this.userData.username,
        password: this.userData.password,
        passwordCheck: this.userData.passwordCheck,
        ID: this.userData.ID
      }) as boolean
      this.loaderService.handleAuth()
      return isFirstValid
    } catch (err) {
      return console.error(err)
    }
  }

  async register(): Promise<void> {
    try {
      this.loaderService.handleAuth()
      
      await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.userData.city}&appid=86457b0129712697ddacbf9b3caa7282`)
        .catch(() => {
          this.loaderService.handleError()
          this.errorService.errorHandelingHttp({ error: { message: 'Sorry, City not found' } })
          throw new Error('Sorry, City not found')
        })

      await this.api.createPostService(this.setting.baseUrl + "/users/register", this.userData)
      this.login(this.userData.username, this.userData.password)
      this.loaderService.handleAuth()
    } catch (err) {
      console.error(err)
    }
  }

  logout(): void {
    this.userData = new User()
    localStorage.setItem('auth-token', '');
    this.router.navigate(["login"])
  }
}
