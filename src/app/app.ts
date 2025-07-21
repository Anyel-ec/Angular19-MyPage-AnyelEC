import { Footer } from './layouts/footer/footer';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeroSectionComponent } from './feature/anyel/section/hero-section-component/hero-section-component';
import { AboutMeSection } from './feature/anyel/section/about-me-section/about-me-section';
import { ResumeSection } from './feature/anyel/section/resume-section/resume-section';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, Footer, HeroSectionComponent, AboutMeSection, ResumeSection],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showLayout = true;

  constructor(private router: Router) {}

  protected title = 'anyel-top';
  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showLayout = !['/500'].includes(event.urlAfterRedirects);
      });
  }
}
