import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../../core/services/theme-service';

@Component({
  selector: 'app-contact-section',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
})
export class ContactSection {
  isDarkMode = false;
  contactForm: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;
  private themeSubscription?: Subscription;

  countries: Country[] = [
    { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
    { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
    { code: 'PE', name: 'Perú', flag: '🇵🇪' },
    { code: 'MX', name: 'México', flag: '🇲🇽' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { code: 'ES', name: 'España', flag: '🇪🇸' },
    { code: 'OTHER', name: 'Otro', flag: '🌍' },
  ];

  socialLinks: SocialLink[] = [
    {
      icon: 'fab fa-github',
      label: 'GitHub:',
      value: 'Anyel EC',
      link: 'https://github.com/Anyel-ec/',
      color: 'text-cyan-400 hover:text-cyan-300',
    },
    {
      icon: 'fab fa-linkedin',
      label: 'LinkedIn:',
      value: 'Angel Paul Patiño Diaz',
      link: 'https://www.linkedin.com/in/angel-pati%C3%B1o/',
      color: 'text-cyan-400 hover:text-cyan-300',
    },
    {
      icon: 'fas fa-envelope',
      label: 'Correo:',
      value: 'cyberdevmatrix@gmail.com',
      link: 'mailto:cyberdevmatrix@gmail.com',
      color: 'text-cyan-400 hover:text-cyan-300',
    },
    {
      icon: 'fab fa-whatsapp',
      label: 'WhatsApp:',
      value: '+593 99 167 5490',
      link: 'https://api.whatsapp.com/send?phone=593991675490&text=Hola%2C%20muy%20buen%20d%C3%ADa.%20%0AConsegu%C3%AD%20este%20n%C3%BAmero%20en%20tu%20sitio%20web.',
      color: 'text-cyan-400 hover:text-cyan-300',
    },
  ];

  constructor(private fb: FormBuilder, private themeService: ThemeService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  ngOnInit() {
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(
      (isDark) => (this.isDarkMode = isDark)
    );
  }

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `Mensaje es requerido`;
      if (field.errors['email']) return 'Email inválido';
      if (field.errors['minlength'])
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['pattern']) return 'Formato inválido';
    }
    return '';
  }
  getCharacterCount(fieldName: string): number {
    return this.contactForm.get(fieldName)?.value?.length || 0;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      // Simular envío del formulario
      await new Promise((resolve) => setTimeout(resolve, 2000));

      this.isSubmitting = false;
      this.showSuccessMessage = true;
      this.contactForm.reset();

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 5000);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.contactForm.controls).forEach((key) => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  openSocialLink(link: string) {
    window.open(link, '_blank');
  }
}
