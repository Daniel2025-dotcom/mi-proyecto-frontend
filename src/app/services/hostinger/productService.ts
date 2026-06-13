import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ProductDto } from './categoryService';

export interface CardProductDto {
  id: number;
  url: string;
  name: string;
  price: number;
}
export interface ProductByCategoryRequestDTO{
  id: number;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/Products';

  getProducts(): Observable<CardProductDto[]> {

    return this.http.get<CardProductDto[]>(this.apiUrl + '/getProducts');
  }

    getProductsByCategory(categoryId: ProductByCategoryRequestDTO): Observable<CardProductDto[]> {
    return this.http.post<CardProductDto[]>( `${this.apiUrl}/getProductsByCategory`, categoryId);
  }
}