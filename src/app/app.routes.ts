import { Routes } from '@angular/router';

import { EntrenadorHorarios } from './pages/entrenador/horarios/horarios';

import { GerenciaDeportes } from './pages/gerencia/deportes/deportes';
import { GerenciaEntrenadores } from './pages/gerencia/entrenadores/entrenadores';

import { SocioDeportes } from './pages/socio/deportes/deportes';
import { SocioHorarios } from './pages/socio/horarios/horarios';

import { Calendario } from './pages/calendario/calendario';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    {
        path: 'gerencia',
        children:[
            {
                path: 'deportes',
                component: GerenciaDeportes
            },
            {
                path: 'entrenadores',
                component: GerenciaEntrenadores
            }
        ],
    },
    {
        path: 'socio',
        children:[
            {
                path: 'deportes',
                component: SocioDeportes
            },
            {
                path: 'horarios',
                component: SocioHorarios
            }
        ]
    },
    {
        path: 'entrenador',
        children:[
            {
                path: 'horarios',
                component: EntrenadorHorarios
            }
        ]
    },
    {path: 'calendario', component: Calendario},
    {path: 'dashboard', component: Dashboard},
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: '**', redirectTo: 'home', pathMatch: 'full' }
];
