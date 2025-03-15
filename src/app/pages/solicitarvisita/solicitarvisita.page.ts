import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-solicitarvisita',
  templateUrl: './solicitarvisita.page.html',
  styleUrls: ['./solicitarvisita.page.scss'],
  standalone: false
})
export class SolicitarvisitaPage implements OnInit {
  propiedad: any = {}; // Objeto vacío para evitar errores
  mostrarFormulario = false;
  fecha: string = '';
  hora: string = '';

  constructor(private router: Router, private toastController: ToastController) {}

  ngOnInit() {
    // Simulación de datos (esto puede venir de un servicio)
    this.propiedad = {
      servicios: [
        { nombre: "WiFi", icono: "wifi" },
        { nombre: "Estacionamiento", icono: "car" },
      ],
      descripcion: "Hermoso departamento en el centro",
      direccion: "Av. Principal 123, Ciudad",
      precio: 12000
    };
  }

  solicitarVisita() {
    this.mostrarFormulario = true;
  }

  async confirmarCita() {
    if (!this.fecha || !this.hora) {
      alert("Por favor, selecciona una fecha y hora.");
      return;
    }

    const toast = await this.toastController.create({
      message: "El arrendatario está por confirmar tu visita.",
      duration: 3000,
      position: "top",
      color: "success"
    });

    await toast.present();

    this.router.navigate(['/search']);
  }
}
