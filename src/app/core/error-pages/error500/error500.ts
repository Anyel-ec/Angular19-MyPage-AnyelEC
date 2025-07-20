import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-error500',
  imports: [CommonModule],
  templateUrl: './error500.html',
  styleUrls: ['./error-styles.css']
})
export class Error500 implements OnInit {
  jokeMessages: string[] = [
    "Error 500: El servidor está en huelga, exige más café.",
    "¡Oh no! Parece que alguien pisó un cable. Estamos buscando el culpable.",
    "Error 500: El servidor está de vacaciones, se fue a la playa de datos.",
    "El servidor está practicando sus chistes para hacer reír a los bits.",
    "Error 500: Los cables y el servidor están en una terapia de pareja. ¡Esperamos que funcione!",
    "¡Ups! Algo salió mal, pero no te preocupes, estamos trabajando en ello.",
    "Error 500: Parece que el servidor olvidó su contraseña. Está tratando de recordarla.",
    "El servidor está tomando una siesta de 500 segundos. Vuelve pronto.",
    "Error 500: Estamos jugando al escondite con el servidor. ¿Puedes encontrarlo?",
    "El servidor está ocupado contando bytes. ¡Es un trabajo agotador!"
  ];

  currentMessage = '';
  modalOpen = false;
  particles: Array<{left: number, top: number, delay: number, duration: number}> = [];

  ngOnInit() {
    this.changeRandomJokeMessage();
    this.generateParticles();
  }

  private generateParticles() {
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2
      });
    }
  }

  private getRandomJokeMessage(): string {
    const idx = Math.floor(Math.random() * this.jokeMessages.length);
    return this.jokeMessages[idx];
  }

  changeRandomJokeMessage() {
    this.currentMessage = this.getRandomJokeMessage();
    setInterval(() => {
      this.currentMessage = this.getRandomJokeMessage();
    }, 10000);
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  reloadPage() {
    window.location.reload();
  }
}
