import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  version:string = "1.0.1";
  baseUrl:string = "https://ng-e-commerce.herokuapp.com";
}
