import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

export interface Category {
  id: number;
  nombre: string;
  hijos?: Category[];
}

export interface CategoryDto {
  categoryName: string;
  parentId?: number;
}

export interface ProductDto {
  name: string;
  description: string;
  price: number;
  url: string;
  categoryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient); 
  private apiUrl = environment.apiUrl + '/admin';

  // Creamos una función auxiliar privada para no repetir la creación de headers en cada método
  private getNgrokHeaders(): HttpHeaders {
    return new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`, { headers: this.getNgrokHeaders() });
  }

  createCategory(categoryDto: CategoryDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/category`, categoryDto, { headers: this.getNgrokHeaders() });
  }

  createProduct(productDto: ProductDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/loadProduct`, productDto, { headers: this.getNgrokHeaders() });
  }
}