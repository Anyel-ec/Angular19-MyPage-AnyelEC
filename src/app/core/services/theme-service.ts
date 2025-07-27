import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeTheme();
  }

  /** lee localStorage o el prefers-color-scheme al arrancar */
  private initializeTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkMode(stored ? stored === 'dark' : prefersDark, /*save*/ false);
    }
  }

  toggleDarkMode() {
    this.setDarkMode(!this.isDarkModeSubject.value);
  }

  /** save=true → guarda en localStorage */
  setDarkMode(isDark: boolean, save = true) {
    this.isDarkModeSubject.next(isDark);

    if (isPlatformBrowser(this.platformId)) {
      const root = document.documentElement;
      isDark ? root.classList.add('dark') : root.classList.remove('dark');

      if (save) {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      }
    }
  }

  /** getter de comodidad */
  get isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }
}
