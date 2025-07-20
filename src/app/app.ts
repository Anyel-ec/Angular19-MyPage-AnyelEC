import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header';
import { BrowserModule } from '@angular/platform-browser';
import { Footer } from "./layouts/footer/footer/footer";
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, Footer],
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
