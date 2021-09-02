import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router, public sidenavService: SidenavService) { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.sidenavService.closeNav(Boolean(this.authService.userData.role))
  }

  async ngOnInit() {
    if (window.innerWidth < 750) this.sidenavService.closeNav()
    let token = localStorage.getItem('auth-token')
    if (!token) {
      this.router.navigate(["login"])
      return
    }
    const user = await this.authService.getUserOnLoad(token) as any
    if (user.role === 1) this.router.navigate([""])
  }
}
