import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
export interface Category {
  id: number;
  nombre: string;
  hijos?: Category[];
} //? significa que es opcional

export interface CategoryDto{
  categoryName:string;
  parentId?:number;
}
export interface ProductDto{
  name:string;
  description:string;
  price:number;
  url:string;
  categoryId:number;
}

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la app
})

export class CategoryService {

  private http = inject(HttpClient); 
  private apiUrl = environment.apiUrl + '/admin';
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  createCategory(categoryDto: CategoryDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/category`,categoryDto);
  }
  createProduct(productDto:ProductDto): Observable<string>{
    return this.http.post<string>(`${this.apiUrl}/loadProduct`,productDto);
  }
}