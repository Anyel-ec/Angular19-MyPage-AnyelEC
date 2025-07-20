import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  public isDarkMode$ = this.isDarkModeSubject.asObservable();
  private platformId: Object;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
    this.initializeTheme();
  }

  private initializeTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.setDarkMode(savedTheme === 'dark');
      } else {
        this.setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    }
  }

  toggleDarkMode() {
    this.setDarkMode(!this.isDarkModeSubject.value);
  }

  setDarkMode(isDark: boolean) {
    this.isDarkModeSubject.next(isDark);
    this.applyTheme(isDark);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }

  private applyTheme(isDark: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('bg-gray-900', 'text-white');
        document.body.classList.remove('bg-white', 'text-gray-900');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.add('bg-white', 'text-gray-900');
        document.body.classList.remove('bg-gray-900', 'text-white');
      }
    }
  }

  get isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }
}
