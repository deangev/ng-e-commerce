import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
    providedIn: 'root'
})
export class ErrorsService {
    constructor() { }

    async errorHandeling(error: any) {
        Swal.fire({
            text: error.error.message,
            icon: 'error',
            title: "שגיאת שרת !!",
            showConfirmButton: false,
            timer: 5500
        })
    }

    async errorHandelingHttp(error: any) {
        Swal.fire({
            text: error.error.message,
            icon: 'error',
            title: "",
            showConfirmButton: false,
            timer: 3500
        })
    }
}
