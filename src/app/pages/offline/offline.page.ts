import { Component } from '@angular/core';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.page.html',
  styleUrls: ['./offline.page.scss'],
  standalone: false
})
export class OfflinePage {
  constructor() { }

  // Método para reintentar la conexión recargando la página
  tryReload() {
    window.location.reload();
  }
}
