import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,  
  imports: [CommonModule, IonicModule, FormsModule] 
})
export class LoginPage {
  user: string = ''; 
  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private authService: AuthService, private loadingController: LoadingController) {}

  async login() {
    if (!this.user || !this.password) {
      alert('Por favor, ingresa tu correo y contraseña.');
      return;
    }
  
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.user)) {
      alert('El formato del correo no es válido.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'bubbles', 
      cssClass: 'custom-spinner' 
    });
    

    await loading.present();
  
    try {
      const userCredential = await this.authService.login(this.user.trim(), this.password);
      if (userCredential) {
        console.log('Usuario autenticado:', userCredential);
  
        // 🔹 Obtener el tipo de usuario desde Firestore
        const userData = await this.authService.getUserData(userCredential.uid);
        if (userData && userData['userType']) {
          console.log('Tipo de usuario:', userData['userType']);
  
          // 🔹 Redirigir según el tipo de usuario
          if (userData['userType'] === 'propietario') {
            this.navCtrl.navigateForward('/property-upload'); // Página para propietarios
          } else if (userData['userType'] === 'quiero-rentar') {
            this.navCtrl.navigateForward('/search'); // Página para estudiantes
          } else {
            alert('Rol de usuario no válido.');
          }
        } else {
          alert('No se encontraron datos del usuario.');
        }
      }
    } catch (error) {
      alert('Error en el login: ' + (error as any).message);
    }finally {
      await loading.dismiss(); 
    }
  }
  
  
  
}
