import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, LoadingController, AlertController } from '@ionic/angular';
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
  isFormValid: boolean = false;

  constructor(private navCtrl: NavController, private authService: AuthService, private loadingController: LoadingController, private alertController: AlertController) {}

  validateForm() {
    this.isFormValid = 
      this.user.trim() !== '' &&
      this.email.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.userType.trim() !== '' &&
      this.password === this.confirmPassword;
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const user = await this.authService.login(email, this.password);
      return user !== null; 
    } catch (error) {
      return false; 
    }
  }


  async register() {

    if (!this.isFormValid) {
      this.showErrorAlert('Por favor, completa todos los campos correctamente.');
      return; 
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(this.password)) {
      this.showErrorAlert('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
      return;
    }

    const emailExists = await this.checkEmailExists(this.email);
    if (emailExists) {
      this.showErrorAlert('El correo electrónico ya está en uso.');
      return;
    }

    
    const loading = await this.loadingController.create({
      message: 'Registrando usuario...',
      spinner: 'bubbles', 
      cssClass: 'custom-spinner' 
    });
    

    await loading.present();
  
    try {
      const userCredential = await this.authService.register(this.email, this.password, this.userType, this.user);
      if (userCredential) {
        console.log('Usuario registrado:', userCredential);
        //alert('Registro exitoso');
        setTimeout(() => {
          this.navCtrl.navigateForward('/login');
        }, 500);
      }
    } catch (error) {
      this.showErrorAlert('Error en el registro: ' + (error as any).message);
    }finally {
      await loading.dismiss(); 
    }
  }
  navigateToLogin() {
    this.navCtrl.navigateForward('/login');
  }
}
