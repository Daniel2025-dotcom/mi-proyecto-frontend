import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/admin/catalog/pdf'; 

  downloadCatalogPdf(): Observable<Blob> {
    return this.http.get(this.apiUrl, { responseType: 'blob' });
  }
}