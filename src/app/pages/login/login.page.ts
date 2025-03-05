import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  user: string = '';
  password: string = '';

  constructor(private navCtrl: NavController) {}

  login() {
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      alert('No hay usuarios registrados');
      return;
    }

    const userData = JSON.parse(storedUser);

    if (this.user === userData.user && this.password === userData.password) {
     // alert('Inicio de sesión exitoso');

      // Redirigir según el tipo de usuario
      if (userData.userType === 'propietario') {
        this.navCtrl.navigateForward('/property-upload');
      } else if (userData.userType === 'quiero-rentar') {
        this.navCtrl.navigateForward('/search');
      } else {
        alert('Rol no válido');
      }
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
