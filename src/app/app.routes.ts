import { Routes } from '@angular/router';
import { Error500 } from './core/error-pages/error500/error500';

export const routes: Routes = [
    { path: '500', component: Error500 },
];
