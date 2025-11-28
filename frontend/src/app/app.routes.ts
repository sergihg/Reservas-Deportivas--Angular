import { Routes } from '@angular/router';

import { EntrenadorHorarios } from './pages/entrenador/horarios/horarios';

import { GerenciaDeportes } from './pages/gerencia/deportes/deportes';
import { GerenciaEntrenadores } from './pages/gerencia/entrenadores/entrenadores';

import { SocioDeportes } from './pages/socio/deportes/deportes';
import { SocioHorarios } from './pages/socio/horarios/horarios';

import { Calendario } from './pages/calendario/calendario';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth-guard';
import { gerenciaGuard } from './guards/gerencia-guard';
import { socioGuard } from './guards/socio-guard';
import { entrenadorGuard } from './guards/entrenador-guard';
import { guestGuard } from './guards/guest-guard';
import { GerenciaSolicitudes } from './pages/gerencia/solicitudes/solicitudes';
import { GerenciaSocios } from './pages/gerencia/socios/socios';

export const routes: Routes = [
    {
        path: 'gerencia',
        canActivate: [authGuard, gerenciaGuard],
        children:[
            {
                path: 'deportes',
                component: GerenciaDeportes
            },
            {
                path: 'entrenadores',
                component: GerenciaEntrenadores
            },
            {
                path: 'socios',
                component: GerenciaSocios
            },
            {
                path: 'solicitudes',
                component: GerenciaSolicitudes
            }
        ],
    },
    {
        path: 'socio',
        canActivate: [authGuard, socioGuard],
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
        canActivate: [authGuard, entrenadorGuard],
        children:[
            {
                path: 'horarios',
                component: EntrenadorHorarios
            }
        ]
    },
    {
        path: 'calendario', 
        component: Calendario,
        canActivate: [authGuard],
    },
    {
        path: 'dashboard', 
        component: Dashboard,
        canActivate: [authGuard],
    },
    {path: 'login', component: Login, canActivate: [guestGuard]},
    {path: 'register', component: Register, canActivate: [guestGuard]},
    {
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
    },
    {path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];
