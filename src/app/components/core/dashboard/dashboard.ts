import { Component, inject } from '@angular/core';
import { StationServices } from '../../../services/station/station-services';
import { BikesServices } from '../../../services/bikes/bikes-services';
import { Router } from '@angular/router';
import { RentServices } from '../../../services/rent/rent-services';
import Swal from 'sweetalert2';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [
    ReactiveFormsModule
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
    stations!:any
    bikes!:any
    rents!: any
    selected: string | null = null;
    estacionId = new FormControl('');

    stationServices = inject(StationServices)
    bikesServices = inject(BikesServices)
    rentServices = inject(RentServices)

    constructor(private router: Router){}

    ngOnInit() {
        this.renderStation()
        this.renderRents()
    }


    renderStation() {
        this.stationServices.getStations().subscribe({
            next:(dataApi:any)=> {
                this.stations = dataApi
                this.renderBikes(this.stations[0]._id)

            },
            error:(error:any)=> {
                console.log(error);
            }
        })
    }

    renderBikes(id:string) {
        this.bikesServices.getBikes(id).subscribe({
            next:(dataApi:any)=> {
                this.bikes = (dataApi)
                this.selected = id;
                console.log(this.bikes);

            },
            error:(error:any)=> {
                console.log(error);

            }
        })
    }

    alquilar(idStation:string, idBike:string) {
        console.log(idBike, idStation);
        if (!!sessionStorage.getItem('user')) {

            const rent = {
                usuario: sessionStorage.getItem('user'),
                bicicleta: idBike,
                estacionSalida: idStation,
                fechaInicio: Date.now(),
                activo: true
            }
            this.rentServices.createRent(rent).subscribe({
                next:(dataApi:any)=> {
                    Swal.fire({
                        title: "Bicicleta rentada!",
                        text: "Disfruta tu viaje!",
                        icon: "success"
                    });
                    this.rents = dataApi
                    this.ngOnInit()
                },
                error:(error:any)=> {
                    console.log(error);
                    Swal.fire({
                        title: "Uups!",
                        text: `${error.error.error}`,
                        icon: "warning"
                    });

                }
            })
        } else {
            Swal.fire({
                title: "Debes iniciar sesión!",
                text: "Oops!...",
                icon: "warning"
            });
        }

    }

    renderRents() {
        this.rentServices.getOneRent(sessionStorage.getItem('user')).subscribe({
            next:(dataApi:any)=> {
                this.rents = (dataApi)
            },
            error:(error:any)=> {
                console.log(error);

            }
        })
    }

    estaciones () {
        this.stationServices.getStations().subscribe({
            next:(dataApi:any)=> {

            },
            error:(error:any)=> {
                console.log(error);
            }
        })
    }

    devolover(id:string) {
        const devol = {
            fechaFin: new Date(),
            activo: false,
            estacionLlegada: this.estacionId.value
        }

        console.log(devol);

        this.rentServices.updateRent(id, devol).subscribe({
            next:(dataApi:any)=> {
                Swal.fire({
                    title: "Bicicleta devuelta!",
                    text: "Ya puedes rentar!",
                    icon: "success"
                });
                this.ngOnInit()
            },
            error:(error:any) => {
                console.log(error);
                Swal.fire({
                    title: "Uups!",
                    text: `${error.error.error}`,
                    icon: "warning"
                });
            }
        })
    }
}
