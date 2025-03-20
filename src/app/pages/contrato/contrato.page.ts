import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.page.html',
  styleUrls: ['./contrato.page.scss'],
  standalone: false
})
export class ContratoPage implements AfterViewInit {
  @ViewChild('signaturePad', { static: false }) signaturePad!: ElementRef<HTMLCanvasElement>;
  private canvasContext!: CanvasRenderingContext2D;
  private drawing = false;
  firmaRealizada = false;

  constructor(private navCtrl: NavController, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.canvasContext = this.signaturePad.nativeElement.getContext('2d')!;
    this.canvasContext.lineWidth = 2;
    this.canvasContext.strokeStyle = '#000';

    this.renderer.listen(this.signaturePad.nativeElement, 'mousedown', (event) => this.startDrawing(event));
    this.renderer.listen(this.signaturePad.nativeElement, 'mousemove', (event) => this.draw(event));
    this.renderer.listen(this.signaturePad.nativeElement, 'mouseup', () => this.stopDrawing());
    this.renderer.listen(this.signaturePad.nativeElement, 'mouseleave', () => this.stopDrawing());
  }

  startDrawing(event: MouseEvent) {
    this.drawing = true;
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(event.offsetX, event.offsetY);
  }

  draw(event: MouseEvent) {
    if (!this.drawing) return;
    this.canvasContext.lineTo(event.offsetX, event.offsetY);
    this.canvasContext.stroke();
    this.verificarFirma();
  }

  stopDrawing() {
    this.drawing = false;
    this.canvasContext.closePath();
    this.verificarFirma();
  }

  clearSignature() {
    this.canvasContext.clearRect(0, 0, this.signaturePad.nativeElement.width, this.signaturePad.nativeElement.height);
    this.firmaRealizada = false;
  }

  verificarFirma() {
    const canvas = this.signaturePad.nativeElement;
    const isEmpty = this.canvasContext.getImageData(0, 0, canvas.width, canvas.height).data.every(pixel => pixel === 0);
    this.firmaRealizada = !isEmpty;
  }

  siguiente() {
    this.navCtrl.navigateForward('/validar-identidad');
  }
}
