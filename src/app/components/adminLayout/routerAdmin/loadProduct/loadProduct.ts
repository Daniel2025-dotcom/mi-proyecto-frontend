import { Component, inject, OnInit, ChangeDetectorRef, PLATFORM_ID, Input } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { catchError, Observable, of } from "rxjs";
import { CategoryTreeComponent } from "../category-tree/category-tree";
import { Category, CategoryService, ProductDto } from "../../../../services/hostinger/categoryService";
import { CloudinaryService } from "../../../../services/claudinary/claudinaryService";
import { ProductByCategoryRequestDTO, ProductService } from "../../../../services/hostinger/productService";

@Component({
  standalone: true,
  templateUrl: './loadProduct.html',
  styleUrls: ['./loadProduct.css'],
  imports: [ReactiveFormsModule, CategoryTreeComponent, AsyncPipe],
})
export class LoadProductComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cloudinary = inject(CloudinaryService);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);

  @Input() isMod: boolean = false;
  productId: number | null = null;

  rutaEscogida: String = 'Ninguna';
  padreEscogido: number | null = null;
  categoriasMock: Category[] = [];
  categories$!: Observable<Category[]>;
  isUploading = false;
  previewUrl: string | null = null;
  selectedFileName = 'Ningún archivo seleccionado';

  form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    urlImg: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.isMod = this.route.snapshot.data['isMod'] || false;

    if (this.isMod) {
      const idParam = this.route.snapshot.paramMap.get('id');
      this.productId = idParam ? Number(idParam) : null;
      this.loadProductforEdit();
    }

    this.categories$ = this.categoryService.getCategories().pipe(
      catchError((err) => {
        console.warn('No se pudieron cargar las categorías (Servidor Offline).');
        return of([]);
      })
    );
  }

  onRutaSeleccionada(evento: { nombre: string, idSeleccionado: number }) {
    this.rutaEscogida = evento.nombre;
    this.padreEscogido = evento.idSeleccionado;
    this.form.patchValue({ categoryId: String(evento.idSeleccionado) });
    console.log(`Seleccionado para ser Padre: ${evento.nombre} (ID: ${evento.idSeleccionado})`);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFileName = file.name;
    this.isUploading = true;
    
    this.cloudinary.upImg(file).subscribe({
      next: (res) => {
        this.previewUrl = res.secure_url;
        this.form.patchValue({ urlImg: res.secure_url });
        this.isUploading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.isUploading = false;
        alert("Algo salió mal al cargar la foto");
      }
    });
  }

  handleSubmit() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (this.form.invalid) {
      alert("Formulario inválido. Por favor, completá todos los campos.");
      return;
    }

    const productDto: ProductDto = {
      name: this.form.value.name!,
      description: this.form.value.description!,
      price: Number(this.form.value.price),
      url: this.form.value.urlImg!,
      categoryId: Number(this.form.value.categoryId)
    };

    if (this.isMod) {
  
      
      // EJEMPLO de cómo deberías llamarlo si tienes el método:
      // this.productService.updateProduct(this.productId!, productDto).subscribe({...})
      
      alert("Lógica de edición ejecutada (Asegúrate de vincular tu endpoint de actualización)");
    } else {
      this.categoryService.createProduct(productDto).subscribe({
        next: () => {
          alert("Producto Cargado Exitosamente");
          this.form.reset();
          this.previewUrl = null;
          this.selectedFileName = 'Ningún archivo seleccionado';
        },
        error: (err) => {
          console.error(err);
          alert("Algo salió mal al intentar guardar en el servidor");
        }
      });
    }
  }

  private loadProductforEdit(): void {
    if (!this.productId) return;
    
    const p: ProductByCategoryRequestDTO = {
      id: this.productId
    };

    this.productService.getProductById(p).subscribe({
      next: (product) => {
        this.form.patchValue({
          name: product.name,
          description: product.description,
          price: String(product.price),
          categoryId: String(product.categoryId),
          urlImg: product.url
        });
        this.previewUrl = product.url;
        this.rutaEscogida = product.path;
      },
      error: (err) => {
        console.error('Error al cargar Producto para edición', err);
      }
    });
  }
}