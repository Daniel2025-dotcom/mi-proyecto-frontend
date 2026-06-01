import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/admin/catalog/pdf';

  downloadCatalogPdf(): Observable<Blob> {
    return this.http.get(this.apiUrl, { responseType: 'blob' });
  }
}