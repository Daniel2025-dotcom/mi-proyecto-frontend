import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
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
    private apiUrl = environment.apiUrl + '/Products' + '/getProducts';

    getProducts(): Observable<CardProductDto[]> {
        return this.http.get<CardProductDto[]>(this.apiUrl);
    }
}
