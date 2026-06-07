import { Component } from '@angular/core';
import { SearchComponent } from '../../adminLayout/header/search/serach';
import { RouterModule } from '@angular/router';
import { PdfService } from '../../../services/hostinger/pdfservice';
import { inject } from '@angular/core';
import { ButtonCategoryComponent } from '../../componentsGeneral/buttonCategory/buttonCategory';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [SearchComponent, RouterModule, ButtonCategoryComponent],
})
export class HeaderCompoent {
  private pdfService: PdfService = inject(PdfService);

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
