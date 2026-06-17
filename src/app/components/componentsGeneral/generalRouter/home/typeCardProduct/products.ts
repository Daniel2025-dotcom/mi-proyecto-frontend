import { Component, inject, OnInit, Input, PLATFORM_ID } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ProductService, CardProductDto } from '../../../../../services/hostinger/productService';
import { Observable, of, combineLatest } from 'rxjs';
import { catchError, map, startWith, take } from 'rxjs/operators'; // Agregamos 'take' aquí
import { CardProductComponent } from './cardProduct';
import { SearchService } from '../../../../../services/hostinger/searchService';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CardProductComponent, AsyncPipe],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private searchService = inject(SearchService);
  private platformId = inject(PLATFORM_ID);
  products$!: Observable<CardProductDto[]>;
  @Input() isAdminList: boolean = false;

  ngOnInit(): void {
    const backendProducts$ = this.productService.getProducts().pipe(
      catchError(err => {
        console.warn('[ProductsComponent] Servidor offline', err);
        return of([]);
      })
    );

    const isBrowser = isPlatformBrowser(this.platformId);
    let searchTerm$: Observable<string>;
    if (isBrowser) {
      searchTerm$ = this.searchService.getSearchTerm().pipe(
        startWith('')
      );
    } else {
      searchTerm$ = this.searchService.getSearchTerm().pipe(
        startWith(''),
        take(1)
      );
    }

     this.products$ = combineLatest([backendProducts$, searchTerm$]).pipe(
            map(([products, term]) => {
              if (!term) {
                return products;
              }
              const cleanTerm = term.toLowerCase();
              return products.filter(product => 
                product.name.toLowerCase().includes(cleanTerm)
              );
      })
    );
  }
  handleModify(product: CardProductDto): void {
    alert(`Modificando: ${product.name}`);
  }

  handleDelete(product: CardProductDto): void {
    this.productService.deleteProduct(product.id).subscribe({
      next: (response) => {
        alert(`Producto eliminado: ${response}`);
      },
      error: (err) => {
        alert('Error al eliminar el producto. Intente nuevamente.');
      }
    });
  }

  handleConsult(product: CardProductDto): void {
    alert(`Redirigiendo a consulta por: ${product.name}`);
  }
}