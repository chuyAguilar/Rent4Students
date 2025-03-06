import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { NavController } from '@ionic/angular';

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

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.cargarPropiedades();
  }

  cargarPropiedades() {
    const savedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    this.propiedades = savedProperties.map((p: any) => ({
      tipo: p.tipo,
      precio: p.especificaciones_adicionales.includes('precio') ? parseInt(p.especificaciones_adicionales.split(':')[1]) : 5000, // Si hay precio en especificaciones, úsalo
      universidad: 'Desconocida', 
      distancia: Math.random() * 10, 
      imagen: 'assets/casa.png' 
    }));
  }


  aplicarFiltros() {
    return this.propiedades.filter(p =>
      (!this.filtroTipo || p.tipo === this.filtroTipo) &&
      p.precio >= this.filtroPrecio[0] && p.precio <= this.filtroPrecio[1]
    );
  }
}
