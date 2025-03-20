import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; // Importamos el servicio de autenticación

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: false
})
export class DetallePage implements OnInit {
  propiedad: any = { imagenes: [] };
  imagenActualIndex: number = 0;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService // Inyectamos el servicio
  ) {}

  async ngOnInit(): Promise<void> {
    // Leemos el id enviado desde SearchPage
    const nav = this.router.getCurrentNavigation();
    const idRecibido = nav?.extras?.state?.['id'];
    console.log("ID recibido en Detalle:", idRecibido);

    if (!idRecibido) {
      // Si no se recibió id, volvemos a Search
      this.navCtrl.navigateBack(['/search']);
      return;
    }

    try {
      // Consultamos en Firestore el documento con ese id usando AuthService
      const propiedad = await this.authService.getPropertyById(idRecibido);
      if (!propiedad) {
        // Si la propiedad no existe, volvemos a Search
        this.navCtrl.navigateBack(['/search']);
      } else {
        // Almacenamos la información de la propiedad y agregamos el id
        this.propiedad = { id: idRecibido, ...propiedad };

        // Inicializamos el índice del carrusel si existen imágenes
        if (this.propiedad.imagenes && this.propiedad.imagenes.length > 0) {
          this.imagenActualIndex = 0;
        }
        console.log('Propiedad obtenida:', this.propiedad);
      }
    } catch (error) {
      console.error('Error al obtener la propiedad:', error);
      this.navCtrl.navigateBack(['/search']);
    }
  }

  async rentar(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Quieres agendar una cita antes de rentar?',
      buttons: [
        {
          text: 'Sí, agendar cita',
          handler: () => {
            console.log('ID enviado a solicitarvisita:', this.propiedad.id);
            this.navCtrl.navigateForward(['/solicitarvisita'], {
              queryParams: { id: this.propiedad.id }
            });
          }
        },
        {
          text: 'No, ir al contrato',
          handler: () => {
            console.log('ID enviado a contrato:', this.propiedad.id);
            this.navCtrl.navigateForward(['/contrato'], {
              queryParams: { id: this.propiedad.id }
            });
          }
        }
      ]      
    });
    await alert.present();
  }

  cambiarImagen(direccion: number): void {
    const total = this.propiedad.imagenes?.length || 0;
    if (total > 0) {
      this.imagenActualIndex = (this.imagenActualIndex + direccion + total) % total;
    }
  }

  handleImageError(): void {
    console.error(
      'Error: La imagen no se pudo cargar:',
      this.propiedad.imagenes[this.imagenActualIndex]
    );
  }
}
