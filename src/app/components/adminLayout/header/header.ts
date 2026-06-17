import { Component, inject, Input } from '@angular/core';
import { SearchComponent } from '../../adminLayout/header/search/serach';
import { RouterModule } from '@angular/router';
import { PdfService } from '../../../services/hostinger/pdfservice';
import { ButtonCategoryComponent } from '../../componentsGeneral/buttonCategory/buttonCategory';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [SearchComponent, RouterModule, ButtonCategoryComponent, CommonModule],
})
export class HeaderCompoent {
  private pdfService: PdfService = inject(PdfService);

  @Input() isAdmin: boolean = false;
  @Input() userName: string = 'Invitado';

  menuAbierto: boolean = false;

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  closeMenu(): void {
    this.menuAbierto = false;
  }

  generarPdf(): void {
    this.pdfService.downloadCatalogPdf().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'catalogo.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al generar el PDF:', err);
        alert('Ocurrió un error al descargar el PDF.');
      },
    });
  }
}