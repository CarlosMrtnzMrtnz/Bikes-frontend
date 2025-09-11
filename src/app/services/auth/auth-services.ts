import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../../environments/api';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {

    private apiUrl = Api.apiUrl

    constructor(private http: HttpClient) {}

    createUser(body:any) {
        return this.http.post(`${this.apiUrl}/user`, body)

    }
    login(body:any) {
        return this.http.post(`${this.apiUrl}/login`, body)
    }

}
