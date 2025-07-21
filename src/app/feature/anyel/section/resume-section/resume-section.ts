import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ThemeService } from '../../../../core/services/theme-service';
import { AboutCard } from '../../../../core/interfaces/about-card-model';
import { CompanyLogo } from '../../../../core/interfaces/company-logo-model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-resume-section',
  imports: [CommonModule],
  templateUrl: './resume-section.html',
  styleUrl: './resume-section.scss',
})
export class ResumeSection implements OnInit, OnDestroy {
  isDarkMode = false;
  private themeSubscription?: Subscription;
  private carouselSubscription?: Subscription;

  currentSlide = 0;
  itemsPerSlide = 4;

  aboutCards: AboutCard[] = [
    {
      icon: 'fas fa-video',
      title: 'Creador de Contenido',
      description:
        'Me apasiona compartir mis experiencias y conocimientos, así como conocer personas maravillosas. Este mundo digital es realmente hermoso. "Búscame como Anyel EC en todas mis redes sociales." Guiño Guiño.',
      iconColor: 'text-cyan-400',
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Analista de Ciberseguridad',
      description:
        'Desde que sufrí un hackeo en mi cuenta de YouTube; carita muy tite :(, me enamoré de ayudar a prevenir que esto le suceda a otras personas.',
      iconColor: 'text-cyan-400',
    },
    {
      icon: 'fas fa-code',
      title: 'Desarrollador Full Stack de Aplicaciones',
      description:
        'Me gusta mucho el desarrollo de aplicaciones móvil y web, especialmente el despliegue e implementación de seguridad. Eso sí, brindando más de lo que se espera.',
      iconColor: 'text-cyan-400',
    },
    {
      icon: 'fas fa-sparkles',
      title: 'Invítame a la Iglesia me estoy convirtiendo en un Cuco Jojojo',
      description:
        'Creo en nuestro Dios, en nuestro señor Jesús como nuestro Salvador, pero me gusta más practicar el ser buena persona, así que te animo a ti también.',
      iconColor: 'text-cyan-400',
    },
  ];

  companyLogos: CompanyLogo[] = [
    {
      name: 'UNIR',
      imageUrl: './logos/unir.png',
      alt: 'UNIR',
    },
    {
      name: 'Cisco',
      imageUrl: './logos/cisco.svg',
      alt: 'Cisco',
    },
    {
      name: 'Google',
      imageUrl: './logos/google.svg',
      alt: 'Google',
    },
    {
      name: 'IBM',
      imageUrl: './logos/ibm.png',
      alt: 'IBM',
    },
    {
      name: 'ESPE',
      imageUrl: './logos/espe.png',
      alt: 'ESPE',
    },
    {
      name: 'Google',
      imageUrl: './logos/google.svg',
      alt: 'Google',
    },
    {
      name: 'AWS',
      imageUrl: './logos/aws.svg',
      alt: 'AWS',
    },
    {
      name: 'UNIR',
      imageUrl: './logos/unir.png',
      alt: 'UNIR',
    },
  ];

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(
      (isDark) => (this.isDarkMode = isDark)
    );

    // Auto-scroll del carrusel cada 3 segundos
    this.carouselSubscription = interval(3000).subscribe(() => {
      this.nextSlide();
    });
  }

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
    this.carouselSubscription?.unsubscribe();
  }

  get totalSlides(): number {
    return Math.ceil(this.companyLogos.length / this.itemsPerSlide);
  }

  get visibleLogos(): CompanyLogo[] {
    const start = this.currentSlide * this.itemsPerSlide;
    const end = start + this.itemsPerSlide;
    return this.companyLogos.slice(start, end);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  }

  prevSlide() {
    this.currentSlide =
      this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
