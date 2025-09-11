import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServices } from '../../../services/auth/auth-services';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
    isActive : boolean =  false
    isLogin : boolean = false
    loged : boolean = !!sessionStorage.getItem('token')
    formRegister !: FormGroup
    formLogin !: FormGroup

    userService = inject(AuthServices)

    constructor(private fb :FormBuilder) {
        this.formRegister = fb.group({
            userName : ['', [
                Validators.required,
                Validators.minLength(3),
            ]],
            email : ['', [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
            ]],
            password : ['', [
                Validators.required,
                Validators.minLength(4)
            ]]
        })

        this.formLogin = fb.group({
            email : ['', [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
            ]],
            password : ['', [
                Validators.required,
                Validators.minLength(4)
            ]]
        })

    }

    register() {
        if (this.formRegister.valid) {

            this.userService.createUser(this.formRegister.value).subscribe({
                next:(dataApi:any)=>{
                    Swal.fire({
                    title: "Usuario registrado!",
                    text: "Bienvenido a BikeRent!",
                    icon: "success"
                    });
                    this.formRegister.reset()
                    setTimeout(() => this.open(), 1000);
                },
                error:(error:any)=> {
                    console.log(error);
                    Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo salio mal!"
                    });

                }
            })
        }

        if (!this.formRegister.valid) {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Formulario incorrecto!"
            });
        }
    }

    login() {
        this.userService.login(this.formLogin.value).subscribe({
            next:(dataApi:any)=>{
                Swal.fire({
                title: "Has ingresado!",
                text: "Bienvenido a BikeRent!",
                icon: "success"
                });
                this.formRegister.reset()
                sessionStorage.setItem('user', dataApi.payload.id)
                sessionStorage.setItem('token', dataApi.token)
                setTimeout(() => this.toggle(), 1000);

            },
            error:(error:any)=> {
                console.log(error);
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salio mal!"
                });

            }
        })
    }

    logout() {
        Swal.fire({
        title: "Estas seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: "Logout!",
            text: "Has cerrado sesión",
            icon: "success"
            });
            sessionStorage.clear()
            this.loged = !!sessionStorage.getItem('token')
        }
        });
    }




    open() {
        if (this.isLogin) {
            this.toggle()
        }
        this.isActive = !this.isActive
    }

    toggle() {
        if (this.isActive) {
            this.open()
        }
    this.isLogin = !this.isLogin
    }
}
