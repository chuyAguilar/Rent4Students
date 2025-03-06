import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  userType: string = '';
  user: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private navCtrl: NavController) {}

  register() {
    console.log('User:', this.user);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Confirm Password:', this.confirmPassword);
    console.log('UserType:', this.userType);
  
    if (!this.user || !this.email || !this.password || !this.confirmPassword || !this.userType) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    // Guardar en localStorage
    localStorage.setItem('user', JSON.stringify({
      user: this.user,
      email: this.email,
      password: this.password,
      userType: this.userType
    }));
  
    //alert('Registro exitoso, ahora puedes iniciar sesión');
    this.navCtrl.navigateForward('/login');
  }
  
}
