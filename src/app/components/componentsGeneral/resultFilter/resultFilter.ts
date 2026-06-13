import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common';
import { CardProductDto, ProductService, ProductByCategoryRequestDTO } from '../../../services/hostinger/productService';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CardProductComponent } from '../generalRouter/home/typeCardProduct/cardProduct';

@Component({
  selector: 'app-result-filter',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CardProductComponent],
  templateUrl: './resultFilter.html',
  styleUrls: ['./resultFilter.css']
  })
export class ResultFilterComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router); 
  private productService = inject(ProductService);
  products$!: Observable<CardProductDto[]>;
  isAdmin: boolean = false;
  ngOnInit(): void {
    this.isAdmin = this.router.url.includes('/admin');
    this.route.queryParams.subscribe(params => {
      const categoryId = params['id'];
      if (!categoryId) return;
      const requestId: ProductByCategoryRequestDTO = {
        id: parseInt(categoryId)
      };

      this.products$ = this.productService
        .getProductsByCategory(requestId)
        .pipe(
          catchError(err => {
            console.warn('[ResultFilterComponent] Servidor offline o error', err);
            return of([]);
          })
        );
    });
  }
  handleModify(product: CardProductDto): void {
    alert(`Modificando desde filtros: ${product.name}`);
  }

  handleDelete(product: CardProductDto): void {
    alert(`Eliminando desde filtros: ${product.name}`);
  }

  handleConsult(product: CardProductDto): void {
    alert(`Consultando por el producto: ${product.name}`);
  }
}