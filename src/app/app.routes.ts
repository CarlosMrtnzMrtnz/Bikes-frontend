import { Routes } from '@angular/router';
import { Dashboard } from './components/core/dashboard/dashboard';
import { Bicicletas } from './components/admin/bicicletas/bicicletas';
import { Estaciones } from './components/admin/estaciones/estaciones';

export const routes: Routes = [

    { path:'dashboard', component:Dashboard},
    { path:'bicicletas', component:Bicicletas},
    { path:'estaciones', component:Estaciones},
    { path:'', redirectTo:'dashboard', pathMatch:'full'},
    { path:'**', redirectTo:'dashboard', pathMatch:'full'}
];
