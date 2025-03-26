import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.page.html',
  styleUrls: ['./mis-citas.page.scss'],
  standalone: false
})
export class MisCitasPage implements OnInit {
  citas = [
    {
      id: 1,
      titulo: 'Renta de departamento',
      fecha: new Date(),
      hora: '10:00 AM',
      ubicacion: 'Av. Reforma 123, CDMX',
      detalles: 'Visita',
      estado: 'Aceptada'
    },
    {
      id: 2,
      titulo: 'Entrega de Documentos',
      fecha: new Date(),
      hora: '3:00 PM',
      ubicacion: 'Colonia Centro, Guadalajara',
      detalles: 'Visita',
      estado: 'Rechazada'
    },
    {
      id: 3,
      titulo: 'Revisión de contrato',
      fecha: new Date(),
      hora: '12:00 PM',
      ubicacion: 'Santa Fe, CDMX',
      detalles: 'Firma de contrato',
      estado: 'Pendiente'
    }
  ];

  constructor(private toastCtrl: ToastController, private navCtrl: NavController) {}

  ngOnInit() {}

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
