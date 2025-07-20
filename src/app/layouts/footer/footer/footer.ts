import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  email: string = '';
  currentYear: number = new Date().getFullYear();

  subscribe() {
    if (this.email.trim()) {
      console.log('Correo suscrito:', this.email);
      // Aquí podrías agregar lógica para enviar el correo al backend
      alert(`¡Gracias por suscribirte con: ${this.email}!`);
      this.email = ''; // Limpiar campo después de enviar
    } else {
      alert('Por favor ingresa un correo válido.');
    }
  }
}
