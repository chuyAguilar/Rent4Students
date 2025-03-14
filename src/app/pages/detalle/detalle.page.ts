import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: false
})
export class DetallePage implements OnInit {
  propiedad: any = { imagenes: [] };
  imagenActualIndex: number = 0;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.propiedad = {
      tipo: 'Casa',
      precio: 2000,
      imagenes: [
        'assets/casa.png',
        'assets/casa.png',
        'assets/casa.png'
      ],
      servicios: [
        { nombre: 'Wifi', icono: 'wifi' },
        { nombre: 'Gas', icono: 'flame' }
      ],
      descripcion: 'Se renta casa de 1 piso para estudiante, cuenta con 1 baño completo, 1 recámara, cocina, área para comedor y estacionamiento para 1 carro.',
      direccion: 'Av. Pie de la Cuesta 2501, Nacional, 76148 Santiago de Querétaro, Qro.'
    };

    if (this.propiedad.imagenes.length > 0) {
      this.imagenActualIndex = 0;
    }
  }

  async rentar() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Quieres agendar una cita antes de rentar?',
      buttons: [
        {
          text: 'Sí, agendar cita',
          handler: () => {
            this.navCtrl.navigateForward('/solicitarvisita');
          }
        },
        {
          text: 'No, ir al contrato',
          handler: () => {
            this.navCtrl.navigateForward('/contrato');
          }
        }
      ]
    });

    await alert.present();
  }

  visita() {
    this.navCtrl.navigateForward('/solicitarvisita');
  }

  cambiarImagen(direccion: number) {
    const totalImagenes = this.propiedad.imagenes.length;
    if (totalImagenes > 0) {
      this.imagenActualIndex = (this.imagenActualIndex + direccion + totalImagenes) % totalImagenes;
    }
  }

  handleImageError() {
    console.error('Error: La imagen no se pudo cargar:', this.propiedad.imagenes[this.imagenActualIndex]);
  }
}
