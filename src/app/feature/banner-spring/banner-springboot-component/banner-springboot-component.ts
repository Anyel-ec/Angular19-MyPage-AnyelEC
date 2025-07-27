import { Component, type OnInit, type OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FigletService } from '../services/figlet-service';
import { ThemeService } from '../../../core/services/theme-service';

@Component({
  selector: 'app-banner-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './banner-springboot-component.html',
  styleUrls: ['./banner-springboot-component.scss'],
})
export class BannerSpringbootComponent implements OnInit, OnDestroy {
  bannerText = 'Welcome';
  captionEnabled = true;
  captionText =
    '${application.title} ${application.version}\nPowered by Spring Boot ${spring-boot.version}';
  additionalInfoEnabled = true;
  additionalInfoText = `:: Spring Boot ::  (v\${spring-boot.version})

  Project: \${spring.application.name}
  Version: \${application.version}

  Product Owner: \${application.po.name}
  Project Manager: \${application.pm.name}
  Developed by: \${application.author.name}

  GitHub Repository: \${application.github.repository}
  Apache License 2.0: \${application.git.license}`;
  selectedFont = 'standard';
  selectedColor = 'BLUE';
  generatedBanner = '';
  isLoading = false;
  showCopySuccess = false;
  isDarkMode = false;
  private themeSubscription?: Subscription;

  availableFonts = [{ value: 'standard', name: 'Standard' }];

  availableColors = [
    {
      value: 'BLUE',
      name: 'Blue',
      class: 'text-blue-600',
      ansi: 'AnsiColor.BLUE',
    },
    {
      value: 'GREEN',
      name: 'Green',
      class: 'text-green-600',
      ansi: 'AnsiColor.GREEN',
    },
    { value: 'RED', name: 'Red', class: 'text-red-600', ansi: 'AnsiColor.RED' },
    {
      value: 'YELLOW',
      name: 'Yellow',
      class: 'text-yellow-600',
      ansi: 'AnsiColor.YELLOW',
    },
    {
      value: 'MAGENTA',
      name: 'Magenta',
      class: 'text-purple-600',
      ansi: 'AnsiColor.MAGENTA',
    },
    {
      value: 'CYAN',
      name: 'Cyan',
      class: 'text-cyan-600',
      ansi: 'AnsiColor.CYAN',
    },
    {
      value: 'WHITE',
      name: 'White',
      class: 'text-gray-800',
      ansi: 'AnsiColor.WHITE',
    },
    {
      value: 'BLACK',
      name: 'Black',
      class: 'text-gray-900',
      ansi: 'AnsiColor.BLACK',
    },
  ];

  private readonly ansiMap: Record<string, string> = {
    'text-green-400': 'AnsiColor.BRIGHT_GREEN',
    'text-yellow-400': 'AnsiColor.BRIGHT_YELLOW',
    'text-cyan-400': 'AnsiColor.BRIGHT_CYAN',
    'text-purple-400': 'AnsiColor.BRIGHT_MAGENTA',
  };
  constructor(
    private figletService: FigletService,
    private titleService: Title,
    private metaService: Meta,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.generateBanner();
    this.setupSEO();
    this.setupTheme();
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  private setupSEO() {
    this.titleService.setTitle('Spring Boot Banner Generator - Anyel EC');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Genera banners ASCII personalizados para Spring Boot con diferentes fuentes y colores.',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Spring Boot, Banner, ASCII, Anyel EC, Figlet Fonts',
    });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Spring Boot Banner Generator',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Genera banners ASCII personalizados para tus proyectos Spring Boot.',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://www.anyel.top/banner-springboot',
    });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
  }

  private setupTheme() {
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(
      (isDark) => {
        this.isDarkMode = isDark;
      }
    );
  }

  async generateBanner() {
    if (!this.bannerText.trim()) {
      this.generatedBanner = '';
      return;
    }

    this.isLoading = true;
    try {
      this.generatedBanner = await this.figletService.generateText(
        this.bannerText,
        this.selectedFont
      );
    } catch (error) {
      console.error('Error generating banner:', error);
      this.generatedBanner = 'Error generating banner';
    } finally {
      this.isLoading = false;
    }
  }

  onTextChange() {
    this.generateBanner();
  }

  onFontChange() {
    this.generateBanner();
  }

  getColorClass(): string {
    const color = this.availableColors.find(
      (c) => c.value === this.selectedColor
    );
    return color ? color.class : 'text-blue-600';
  }

  async copyToClipboard() {
    try {
      const fullBanner = this.getFullBannerWithAnsiColors();
      await navigator.clipboard.writeText(fullBanner);

      this.showCopySuccess = true;
      setTimeout(() => {
        this.showCopySuccess = false;
      }, 1000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      // Fallback para navegadores que no soportan clipboard API
      this.fallbackCopyToClipboard(this.getFullBannerWithAnsiColors());
    }
  }

  private fallbackCopyToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      this.showCopySuccess = true;
      setTimeout(() => {
        this.showCopySuccess = false;
      }, 300);
    } catch (error) {
      console.error('Fallback copy failed:', error);
    } finally {
      document.body.removeChild(textArea);
    }
  }

  downloadBanner() {
    const fullBanner = this.getFullBannerWithAnsiColors();
    const blob = new Blob([fullBanner], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'banner.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private getFullBannerWithAnsiColors(): string {
    // Color seleccionado para el arte ASCII
    const bannerAnsi =
      this.availableColors.find((c) => c.value === this.selectedColor)?.ansi ??
      'AnsiColor.BLUE';

    let result = `\${${bannerAnsi}}\n${this.generatedBanner}\n\n`;

    // Información adicional línea a línea con su color
    if (this.additionalInfoEnabled && this.additionalInfoText.trim()) {
      for (const { text, colorClass } of this.getAdditionalInfoLines()) {
        const ansi = this.ansiMap[colorClass] ?? 'AnsiColor.WHITE';
        result += `\${${ansi}}${text}\n`;
      }
      result += '\n'; // salto extra al final de la sección
    }

    // Leyenda (pie de página) siempre en blanco
    if (this.captionEnabled && this.captionText.trim()) {
      result += `\${AnsiColor.WHITE}${this.captionText}`;
    }

    return result;
  }

  getAdditionalInfoLines(): Array<{ text: string; colorClass: string }> {
    if (!this.additionalInfoEnabled || !this.additionalInfoText.trim()) {
      return [];
    }

    const lines = this.additionalInfoText.split('\n');
    const result: Array<{ text: string; colorClass: string }> = [];

    for (const line of lines) {
      if (line.includes(':: Spring Boot ::')) {
        result.push({ text: line, colorClass: 'text-green-400' });
      } else if (line.includes('Project:') || line.includes('Version:')) {
        result.push({ text: line, colorClass: 'text-yellow-400' });
      } else if (
        line.includes('Product Owner:') ||
        line.includes('Project Manager:') ||
        line.includes('Developed by:')
      ) {
        result.push({ text: line, colorClass: 'text-cyan-400' });
      } else if (
        line.includes('GitHub Repository:') ||
        line.includes('Apache License')
      ) {
        result.push({ text: line, colorClass: 'text-purple-400' });
      } else {
        result.push({ text: line, colorClass: 'text-green-400' });
      }
    }

    return result;
  }

  get selectedAnsiColor(): string {
    const color = this.availableColors.find(
      (c) => c.value === this.selectedColor
    );
    return color ? color.ansi : 'AnsiColor.BLUE';
  }
}
