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

  cargarPropiedades(): void {
    // Usamos runInInjectionContext para asegurar el contexto de inyección
    runInInjectionContext(this.injector, () => {
      this.afs.collection('properties')
        .valueChanges({ idField: 'id' }) // Esto agrega el campo "id" a cada documento
        .subscribe((properties: any[]) => {
          this.propiedades = properties.map(p => ({
            ...p, // Copia todos los campos originales (incluido el id gracias a valueChanges)
            // Forzamos un precio numérico si 'especificaciones_adicionales' contiene "precio:xxxx"
            precio: (typeof p.especificaciones_adicionales === 'string' &&
                      p.especificaciones_adicionales.includes('precio'))
                      ? parseInt(p.especificaciones_adicionales.split(':')[1]) || 5000
                      : 5000,
            distancia: Math.random() * 10,
            imagen: (p.imagenes && p.imagenes.length > 0)
                      ? p.imagenes[0]
                      : 'assets/casa.png'
          }));
          console.log('Propiedades cargadas:', this.propiedades);
        });
    });
  }

  verDetalle(propiedad: any): void {
    console.log('Propiedad seleccionada:', propiedad);
    console.log('ID de la propiedad:', propiedad.id);
    // Navegamos a Detalle pasando sólo el id
    this.navCtrl.navigateForward(['/detalle'], { state: { id: propiedad.id } });
  }

  aplicarFiltros() {
    return this.propiedades.filter(p =>
      (!this.filtroTipo || p.tipo === this.filtroTipo) &&
      p.precio >= this.filtroPrecio[0] && p.precio <= this.filtroPrecio[1]
    );
  }
}
