import { Routes } from '@angular/router';
import { Error500 } from './core/error-pages/error500/error500';
import { BannerSpringbootComponent } from './feature/banner-spring/banner-springboot-component/banner-springboot-component';

export const routes: Routes = [
    { path: '500', component: Error500 },
    { path: 'projects/banner-springboot', component: BannerSpringbootComponent}
];
