import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-property-upload',
  templateUrl: './property-upload.page.html',
  styleUrls: ['./property-upload.page.scss'],
  standalone: false
})
export class PropertyUploadPage {
  googleMapUrl: string = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAeAPQEqCfKYwd8C6ZewS_amcJ7Xm6RDvA&q=Querétaro,México';
  propertyType: string = '';
  rooms: number = 1;
  bathrooms: number = 1;
  parking: number = 0;
  water: boolean = false;
  electricity: boolean = false;
  internet: boolean = false;
  gas: boolean = false;
  ineSelected: boolean = false;
  passportSelected: boolean = false;
  documentPreview: string | ArrayBuffer | null = null;
  additionalSpecs: string = '';
  propertyImages: string[] = []; 
  constructor(private navCtrl: NavController) {}

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = () => {
          this.propertyImages.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onDocumentSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.documentPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

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

  publish() {
    const propertyData = {
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
      imagenes: this.propertyImages 
    };
  
    const savedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    savedProperties.push(propertyData);
    localStorage.setItem('properties', JSON.stringify(savedProperties));
  
    this.openModal();
    console.log('Propiedad publicada:', propertyData);
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
