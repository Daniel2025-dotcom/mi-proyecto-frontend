import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
export interface CardProductDto {
  id: number;
  url: string;
  name: string;
  price: number;
  pathCategory: string;
}
export interface ProductByCategoryRequestDTO{
  id: number;
}
export interface ProductResponseDTO {
    name:string;
    description:string;
    price:number;
    url:string;
    categoryId:number;
    path:string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/Products';
  private adminUrl = environment.apiUrl + '/admin';

  getProducts(): Observable<CardProductDto[]> {

    return this.http.get<CardProductDto[]>(this.apiUrl + '/getProducts');
  }

    getProductsByCategory(categoryId: ProductByCategoryRequestDTO): Observable<CardProductDto[]> {
    return this.http.post<CardProductDto[]>( `${this.apiUrl}/getProductsByCategory`, categoryId);
  }
  deleteProduct(id: number): Observable<string> {
    return this.http.post(`${this.adminUrl}/deleteProduct`, { id: id }, { responseType: 'text' }
    );
  }
  getProductById(ProductId:ProductByCategoryRequestDTO): Observable<ProductResponseDTO> {
    return this.http.post<ProductResponseDTO>(`${this.apiUrl}/getProductById`,ProductId);
  }
}