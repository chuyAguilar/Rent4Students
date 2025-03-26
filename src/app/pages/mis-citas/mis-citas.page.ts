import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.page.html',
  styleUrls: ['./mis-citas.page.scss'],
  standalone: false
})
export class MisCitasPage implements OnInit {
  citas: any[] = [];

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCitas();
  }

  async loadCitas() {
    try {
      this.citas = await this.authService.getCitasSentByCurrentUser();
    } catch (error) {
      console.error('Error al cargar las citas:', error);
      this.mostrarToast('Error al cargar las citas', 'danger');
    }
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'Aceptada':
        return 'success';
      case 'Rechazada':
        return 'danger';
      default:
        return 'warning';
    }
  }

  refreshCitas(event: any) {
    setTimeout(() => {
      this.loadCitas();
      event.target.complete();
      this.mostrarToast('Citas actualizadas.', 'primary');
    }, 1500);
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  verCitas() {
    this.navCtrl.navigateForward('/mis-citas');
  }

  cerrarSesion() {
    localStorage.removeItem('userToken');
    this.navCtrl.navigateRoot('/login');
  }
}
