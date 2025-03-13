import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,  // ✅ Indica que es un componente standalone
  imports: [CommonModule, IonicModule, FormsModule] // ✅ Importar módulos necesarios
})
export class RegisterPage {
  user: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  userType: string = '';

  constructor(private navCtrl: NavController, private authService: AuthService) {}

  async register() {
    if (!this.user || !this.email || !this.password || !this.confirmPassword || !this.userType) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    if (this.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
  
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    try {
      const userCredential = await this.authService.register(this.email, this.password, this.userType, this.user);
      if (userCredential) {
        console.log('Usuario registrado:', userCredential);
        alert('Registro exitoso');
        this.navCtrl.navigateForward('/login');
      }
    } catch (error) {
      alert('Error en el registro: ' + (error as any).message);
    }
  }
  
}
