import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  sideNav: any
  main: any
  open: boolean = true
  constructor() { }

  toggleNav(isAdmin?: boolean) {
    if (this.open) this.closeNav(isAdmin)
    else this.openNav(isAdmin)
  }

  getChevronStyle(): { transform: string } {
    if (this.open) {
      return { transform: 'rotate(0deg)' }
    } else {
      return { transform: 'rotate(-180deg)' }
    }
  }

  openNav(isAdmin?: boolean) {
    const currentWidth = window.innerWidth

    const sideNav = document.getElementById("mySidenav") as HTMLElement
    const main = document.getElementById(isAdmin ? 'admin-main' : "main") as HTMLElement
    if (currentWidth > 750) {
      sideNav.style.width = "310px";
      main.style.marginLeft = "380px";
    } else if (currentWidth < 750 && currentWidth > 550) {
      sideNav.style.width = (currentWidth - 65) + 'px';
      main.style.marginLeft = "415px";
    } else {
      sideNav.style.width = "100vw";
      main.style.marginLeft = "100vw";
      const primaryEl = document.querySelector('.primary-main') as HTMLElement
      const body = document.querySelector('body') as HTMLElement
      primaryEl.style.overflowY = 'hidden'
      body.style.overflowY = 'hidden'
    }
    this.open = true
  }

  closeNav(isAdmin?: boolean) {
    const currentWidth = window.innerWidth
    const sideNav = document.getElementById("mySidenav") as HTMLElement
    const main = document.getElementById(isAdmin ? 'admin-main' : "main") as HTMLElement
    if (currentWidth < 550) {
      if (sideNav) sideNav.style.width = '0';
      if (main) main.style.marginLeft = '0';
      this.open = false
      return
    }
    if (sideNav) sideNav.style.width = "0";
    if (main) main.style.marginLeft = "65px";
    this.open = false
  }
}
