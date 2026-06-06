import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // <--- Inyectamos Router también
import { ProductService } from '../../../../services/hostinger/productService';

@Component({
  selector: 'app-result-filter',
  standalone: true, // No olvides el standalone si estás usándolo así
  template: `
    <div class="contenedor">
      <h2>Estás en el camino: {{ urlCompleta }}</h2>
      <p>Categoría final a buscar: <strong>{{ categoriaFinal }}</strong></p>
    </div>
  `
})
export class ResultFilterComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router); // <--- Inyectamos el Router de forma oficial
  private productService = inject(ProductService);

  urlCompleta: string = '';
  categoriaFinal: string = '';

  ngOnInit(): void {
    // Escuchamos los cambios de la URL a través de la ruta activa
    this.route.url.subscribe(() => {
      // Usamos router.url que es la forma pública y segura de leer la barra de direcciones
      const urlReal = this.router.url; 
      
      // Separamos la URL por barras limpiamente
      const urlSegmentos = urlReal.split('/'); 
      
      // Ahora TypeScript sabe que 'seg' es un string sin que se lo digas
      const caminoFiltrado = urlSegmentos.filter((seg: string) => seg !== '' && seg !== 'productos');
      
      this.urlCompleta = caminoFiltrado.join(' > '); // Resultado visual limpio: "celulares > apple"
      
      // Obtenemos el último elemento del camino
      this.categoriaFinal = caminoFiltrado[caminoFiltrado.length - 1];

      if (this.categoriaFinal) {
        this.cargarProductos(this.categoriaFinal);
      }
    });
  }

  cargarProductos(slugCategoria: string) {
    console.log('PIDIENDO AL BACKEND PRODUCTOS DE:', slugCategoria);
    // Tu servicio va acá...
  }
}