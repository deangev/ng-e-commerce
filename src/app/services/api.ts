import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, timeout as setTimeout, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorsService } from '../services/error.service';
import { LoaderService } from './loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, public errorService: ErrorsService, public loaderService: LoaderService) { }

  createPostService(url: string, ob: any, headersData?: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', ...headersData });
        await this.httpClient.post(url, ob, { headers }).subscribe(data => {
          resolve(data);
        }, error => {
          this.loaderService.handleError()
          this.errorService.errorHandelingHttp(error)
          console.log('oops', error, error.error)
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  createGetService(url: string, headersData?: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', ...headersData });
        await this.httpClient.get(url, { headers }).subscribe(data => {
          resolve(data);
        }, error => {
          this.errorService.errorHandelingHttp(error)
          console.log('oops', error, error.error)
        });
      } catch (err) {
        console.log("ERRORRR : ", err)
        console.log(err);
      }
    });
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return throwError(errMsg);
  }
}
