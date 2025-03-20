import { Component, runInInjectionContext, Injector } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
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
    private injector: Injector,
    private alert: AlertController,
    private loadingController: LoadingController
  ) {}


  isFormValid(): boolean {
    return (
      this.propertyType.trim() !== '' &&
      this.rooms > 0 &&
      this.bathrooms > 0 &&
      this.parking >= 0 &&
      this.additionalSpecs.trim() !== '' &&
      this.documentPreview !== null &&
      (this.ineSelected || this.passportSelected) &&
      this.propertyImages.length > 0
    );
  }
  

  onImageSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let file of files) {
        if (file.size > 1 * 1024 * 1024) { // ✅ 1 MB de límite
          this.showAlert('La imagen excede el tamaño máximo de 1 MB.');
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          this.propertyImages.push(reader.result as string);
        };
        reader.onerror = () => {
          this.showAlert('Hubo un problema al leer la imagen. Intenta nuevamente.');
        };
        reader.readAsDataURL(file);
      }
    } else {
      this.showAlert('No se seleccionó ninguna imagen.');
    }
  }

  // Maneja la selección del documento de identidad
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) { // ✅ 1 MB de límite
        this.showAlert('El documento de identidad excede el tamaño máximo de 1 MB.');
        return;
      }

      this.selectedDocument = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.documentPreview = reader.result;
      };
      reader.onerror = () => {
        this.showAlert('Hubo un problema al leer el documento. Intenta nuevamente.');
      };
      reader.readAsDataURL(file);
    } else {
      this.showAlert('No se seleccionó ningún documento.');
    }
  }

  async showAlert(message: string) {
    const alert = await this.alert.create({
      header: 'Error',
      message: message,
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }
  

  

  // Publica la propiedad guardando la información en Firestore
  async publish() {

    const loading = await this.loadingController.create({
      message: 'Publicando propiedad...',
      spinner: 'bubbles',
      cssClass: 'custom-spinner'
    });
    await loading.present();

    try {
      const user = await this.afAuth.currentUser;
      if (!user) {
        this.showAlert("No hay usuario autenticado");
        await loading.dismiss();
        return;
      }
      const ownerId = user.uid;
      const propertyData = {
        ownerId: ownerId,
        tipo: this.propertyType,
        habitaciones: this.rooms,
        banos: this.bathrooms,
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

      await loading.dismiss();

    } catch (error) {
      console.error("Error al publicar la propiedad: ", error);
      this.showAlert('Hubo un problema al guardar la propiedad. Por favor, inténtalo nuevamente.');
      await loading.dismiss();
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
