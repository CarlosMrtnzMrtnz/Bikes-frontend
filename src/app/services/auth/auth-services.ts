import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {

    private apiUrl = "http://localhost:3000/api"

    constructor(private http: HttpClient) {}

    createUser(body:any) {
        return this.http.post(`${this.apiUrl}/user`, body)

    }
    login(body:any) {
        return this.http.post(`${this.apiUrl}/login`, body)
    }

}
