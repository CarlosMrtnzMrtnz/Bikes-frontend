import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentServices {

    private apiUrl = "http://localhost:3000/api"

    constructor(private http: HttpClient) {}

    getRent() {
        return this.http.get(`${this.apiUrl}/alquiler`)
    }

    getOneRent(id:any) {
        return this.http.get(`${this.apiUrl}/alquiler/${id}`)
    }

    createRent(body:any) {
        return this.http.post(`${this.apiUrl}/alquiler`, body)
    }

    updateRent(id:string, body:any) {
        return this.http.put(`${this.apiUrl}/alquiler/status/${id}`, body)
    }

    deleteRent(id:string) {
        return this.http.delete(`${this.apiUrl}/alquiler/${id}`)
    }
}
