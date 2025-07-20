import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from "rxjs"
import { ThemeService } from "../../core/services/theme-service";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;
  isMobileMenuOpen = false;
  private themeSubscription: Subscription = new Subscription()

  constructor(private themeService: ThemeService) {}


  ngOnInit() {
    // Suscribirse a los cambios del tema
    this.themeSubscription = this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark
    })
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe()
  }

  toggleDarkMode() {
    // Usar el servicio para cambiar el tema
    this.themeService.toggleDarkMode()
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

}
