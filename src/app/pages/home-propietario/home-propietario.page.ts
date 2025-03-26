import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home-propietario',
  templateUrl: './home-propietario.page.html',
  styleUrls: ['./home-propietario.page.scss'],
  standalone: false
})
export class HomePropietarioPage {

  constructor(private navCtrl: NavController) {}

  verCitas() {
    this.navCtrl.navigateForward('/citas-propietario');
  }

  publicarPropiedad() {
    this.navCtrl.navigateForward('/property-upload');
  }

  cerrarSesion() {
    // Lógica para cerrar sesión (puedes limpiar el localStorage si guardas el token allí)
    localStorage.removeItem('userToken'); // Si usas localStorage para almacenar sesión
    this.navCtrl.navigateRoot('/login');
  }

}
