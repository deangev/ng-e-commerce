import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsername: string = ''
  loginPassword: string = ''

  isRegister: boolean = false
  currentRegisterPage: number = 1
  isFirstRegisterValid: boolean = false
  isSecondRegisterValid: boolean = false

  constructor(public authService: AuthService, public router: Router, public loaderService: LoaderService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('auth-token')

    if (!token) {
      localStorage.setItem('auth-token', "")
      return
    }
    else this.router.navigate([''])
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.isRegister) {
        if (this.currentRegisterPage === 1) this.checkFirstRegisterPage()
        else this.handleRegister()
        return
      }
      this.handleLogin()
    }
  }

  async checkFirstRegisterPage() {
    const isValid = await this.authService.checkFirst()
    if (isValid) {
      this.currentRegisterPage = 2
      this.isFirstRegisterValid = true
    }
  }

  async handleLogin() {
    await this.authService.login(this.loginUsername, this.loginPassword)
  }

  async handleRegister() {
    await this.authService.register()
  }
}
