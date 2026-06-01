import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/admin/catalog/pdf';

  downloadCatalogPdf(): Observable<Blob> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });

    // Pasamos tanto los headers como el responseType
    return this.http.get(this.apiUrl, { headers, responseType: 'blob' });
  }
}