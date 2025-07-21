import { Component } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme-service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-about-me-section',
  imports: [CommonModule],
  templateUrl: './about-me-section.html',
  styleUrl: './about-me-section.scss'
})
export class AboutMeSection {
  isDarkMode = false;
  private themeSubscription?: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(
      isDark => this.isDarkMode = isDark
    );
  }

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
