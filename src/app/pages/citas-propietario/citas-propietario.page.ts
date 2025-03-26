import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-citas-propietarios',
  templateUrl: './citas-propietario.page.html',
  styleUrls: ['./citas-propietario.page.scss'],
  standalone: false
})
export class CitasPropietariosPage {
  citas = [
    {
      id: 1,
      titulo: 'Renta de departamento',
      fecha: new Date(),
      hora: '10:00 AM',
      cliente: 'Juan Pérez',
      ubicacion: 'Av. Reforma 123, CDMX',
      detalles: 'Visita'
    },
    {
      id: 2,
      titulo: 'Entrega de Documentos',
      fecha: new Date(),
      hora: '3:00 PM',
      cliente: 'Ana López',
      ubicacion: 'Colonia Centro, Guadalajara',
      detalles: 'Visita'
    }
  ];

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController,private navCtrl: NavController) {}

  async aceptarCita(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Estás seguro de aceptar esta cita?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Aceptar',
          handler: () => {
            this.mostrarToast('Cita aceptada correctamente.', 'success');
          }
        }
      ]
    });
    await alert.present();
  }

  async rechazarCita(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Estás seguro de rechazar esta cita?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Rechazar',
          handler: () => {
            this.mostrarToast('Cita rechazada.', 'danger');
          }
        }
      ]
    });
    await alert.present();
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

  refreshCitas(event: any) {
    setTimeout(() => {
      event.target.complete();
      this.mostrarToast('Citas actualizadas.', 'primary');
    }, 1500);
  }


  verCitas() {
    this.navCtrl.navigateForward('/citas-propietarios');
  }

  publicarPropiedad() {
    this.navCtrl.navigateForward('/property-upload');
  }

  cerrarSesion() {
    localStorage.removeItem('userToken'); 
    this.navCtrl.navigateRoot('/login');
  }

}