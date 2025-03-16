import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { runInInjectionContext, Injector } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false
})
export class SearchPage implements OnInit {
  filtroTipo: string = '';
  filtroUniversidad: string = '';
  filtroPrecio: number[] = [2000, 10000];

  propiedades: any[] = []; 

  constructor(
    private navCtrl: NavController,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private injector: Injector
  ) {}
  
  ngOnInit() {
    this.cargarPropiedades();
  }
  
  cargarPropiedades() {
    runInInjectionContext(this.injector, () => {
      this.afs.collection('properties').valueChanges({ idField: 'id' }).subscribe((properties: any[]) => {
        this.propiedades = properties.map(p => ({
          tipo: p.tipo,
          precio: p.especificaciones_adicionales && p.especificaciones_adicionales.includes('precio')
                  ? parseInt(p.especificaciones_adicionales.split(':')[1])
                  : 5000,
          universidad: p.universidad || 'Desconocida',
          distancia: Math.random() * 10,
          imagen: p.imagenes && p.imagenes.length > 0 ? p.imagenes[0] : 'assets/casa.png'
        }));
      });
    });
  }
  
  
  verDetalle(propiedad: any) {
    this.navCtrl.navigateForward(['/detalle'], { state: { propiedad } });
  }

  aplicarFiltros() {
    return this.propiedades.filter(p =>
      (!this.filtroTipo || p.tipo === this.filtroTipo) &&
      p.precio >= this.filtroPrecio[0] && p.precio <= this.filtroPrecio[1]
    );
  }
}
