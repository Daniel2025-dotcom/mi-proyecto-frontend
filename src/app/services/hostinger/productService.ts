import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface CardProductDto {
  id: number;
  url: string;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/Products/getProducts';

    getProducts(): Observable<CardProductDto[]> {
        return this.http.get<CardProductDto[]>(this.apiUrl);
    }
}
