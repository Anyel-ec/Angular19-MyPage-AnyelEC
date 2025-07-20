import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-hero-section-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section-component.html',
  styleUrls: ['./hero-section-component.scss'],
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  // Textos para el efecto typewriter
  words: string[] = [
    'Ciberseguridad',
    'Inteligencia Artificial',
    'Arquitectura de Software',
    'Arquitectura en la Nube'
  ];

  displayText: string = '';
  private currentWordIndex: number = 0;
  private isTyping: boolean = false;
  private isDeleting: boolean = false;
  private timeoutId: any;

  // Elementos del fondo
  dots: Array<{x: number, y: number, delay: number, duration: number}> = [];
  lines: Array<{x1: number, y1: number, x2: number, y2: number, delay: number}> = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.generateDots();
    this.generateLines();
    this.startTypewriter();
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private generateDots() {
    // Generar puntos distribuidos elegantemente
    for (let i = 0; i < 50; i++) {
      this.dots.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3
      });
    }
  }

  private generateLines() {
    // Generar líneas conectoras sutiles
    for (let i = 0; i < 15; i++) {
      this.lines.push({
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        delay: Math.random() * 2
      });
    }
  }

  private startTypewriter() {
    this.typeWord();
  }

  private typeWord() {
    if (this.isTyping) return;

    this.isTyping = true;
    const currentWord = this.words[this.currentWordIndex];
    let charIndex = 0;

    // Función para escribir letra por letra
    const typeChar = () => {
      if (charIndex < currentWord.length) {
        this.displayText += currentWord[charIndex];
        this.cdr.detectChanges(); // ¡ESTO ES CLAVE!
        charIndex++;
        this.timeoutId = setTimeout(typeChar, 150); // Velocidad de escritura
      } else {
        // Terminó de escribir, esperar y luego borrar
        this.isTyping = false;
        this.timeoutId = setTimeout(() => {
          this.deleteWord();
        }, 2000); // Pausa antes de borrar
      }
    };

    typeChar();
  }

  private deleteWord() {
    if (this.isDeleting) return;

    this.isDeleting = true;

    // Función para borrar letra por letra
    const deleteChar = () => {
      if (this.displayText.length > 0) {
        this.displayText = this.displayText.slice(0, -1);
        this.cdr.detectChanges();
        this.timeoutId = setTimeout(deleteChar, 95); // Velocidad de borrado (más rápido)
      } else {
        // Terminó de borrar, cambiar a la siguiente palabra
        this.isDeleting = false;
        this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
        this.timeoutId = setTimeout(() => {
          this.typeWord();
        }, 500); // Pausa antes de escribir la siguiente palabra
      }
    };

    deleteChar();
  }
}
