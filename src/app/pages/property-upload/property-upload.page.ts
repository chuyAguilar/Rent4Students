import { Component, runInInjectionContext, Injector } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-property-upload',
  templateUrl: './property-upload.page.html',
  styleUrls: ['./property-upload.page.scss'],
  standalone: false
})
export class PropertyUploadPage {
  // URL para mostrar el mapa (opcional)
  googleMapUrl: string = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAeAPQEqCfKYwd8C6ZewS_amcJ7Xm6RDvA&q=Querétaro,México';

  // Variables vinculadas al formulario
  propertyType: string = '';
  rooms: number = 1;
  bathrooms: number = 1;
  parking: number = 0;
  additionalSpecs: string = '';

  // Servicios disponibles
  water: boolean = false;
  electricity: boolean = false;
  internet: boolean = false;
  gas: boolean = false;

  // Validación de identidad
  ineSelected: boolean = false;
  passportSelected: boolean = false;
  documentPreview: string | ArrayBuffer | null = null;
  selectedDocument?: File;

  // Imágenes de la propiedad
  propertyImages: string[] = [];

  constructor(
    private navCtrl: NavController,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private injector: Injector
  ) {}

  // Maneja la selección de imágenes para la propiedad
  onImageSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = () => {
          this.propertyImages.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // Maneja la selección del documento de identidad
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedDocument = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.documentPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Publica la propiedad guardando la información en Firestore
  async publish() {
    try {
      const user = await this.afAuth.currentUser;
      if (!user) {
        console.error("No hay usuario autenticado");
        return;
      }
      const ownerId = user.uid;
      const propertyData = {
        ownerId: ownerId,
        tipo: this.propertyType,
        habitaciones: this.rooms,
        baños: this.bathrooms,
        estacionamiento: this.parking,
        especificaciones_adicionales: this.additionalSpecs,
        servicios: {
          agua: this.water,
          luz: this.electricity,
          internet: this.internet,
          gas: this.gas
        },
        identidad: {
          ine: this.ineSelected,
          pasaporte: this.passportSelected
        },
        documento: this.documentPreview,
        imagenes: this.propertyImages,
        createdAt: new Date()
      };

      await runInInjectionContext(this.injector, async () => {
        await this.afs.collection('properties').add(propertyData);
      });

      console.log('Propiedad publicada:', propertyData);
      this.openModal();

    } catch (error) {
      console.error("Error al publicar la propiedad: ", error);
    }
  }

  openModal() {
    const modal = document.getElementById('confirmationModal')!;
    modal.style.display = 'flex';
  }

  closeModal() {
    const modal = document.getElementById('confirmationModal')!;
    modal.style.display = 'none';
  }
}
