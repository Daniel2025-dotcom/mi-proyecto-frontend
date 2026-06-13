import { Component, inject, OnInit, Input } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ProductService, CardProductDto } from '../../../../../services/hostinger/productService';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CardProductComponent } from './cardProduct';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CardProductComponent, AsyncPipe],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  products$!: Observable<CardProductDto[]>;

  @Input() isAdminList: boolean = false;

  ngOnInit(): void {
    this.products$ = this.productService.getProducts().pipe(
      catchError(err => {
        console.warn('[ProductsComponent] Servidor offline', err);
        return of([]);
      })
    );
  }

  handleModify(product: CardProductDto): void {
    alert(`Modificando: ${product.name}`);
  }

  handleDelete(product: CardProductDto): void {
    alert(`Eliminando: ${product.name}`);
  }

  handleConsult(product: CardProductDto): void {
    alert(`Redirigiendo a consulta por: ${product.name}`);
  }
}