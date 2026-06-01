import { Component, inject, OnInit, ChangeDetectorRef, PLATFORM_ID } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CategoryTreeComponent } from "../category-tree/category-tree";
import { Category, CategoryService, ProductDto } from "../../../../services/hostinger/categoryService";
import { catchError, Observable,of } from "rxjs";
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { CloudinaryService } from "../../../../services/claudinary/claudinaryService";

@Component({
  standalone: true,
  templateUrl: './loadProduct.html',
  styleUrls: ['./loadProduct.css'],
  imports: [ReactiveFormsModule, CategoryTreeComponent, AsyncPipe],
})
export class LoadProductComponent implements OnInit {
  private cloudinary = inject(CloudinaryService);
  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  rutaEscogida: String = 'Ninguna';
  padreEscogido: number | null = null;
  categoriasMock: Category[] = [];
  categories$!: Observable<Category[]>;
  isUploading = false;
  previewUrl: string | null = null;
  selectedFileName = 'Ningún archivo seleccionado';

  ngOnInit(): void {
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
    this.form.patchValue({categoryId: String(evento.idSeleccionado)
    });
    console.log(`Seleccionado para ser Padre: ${evento.nombre} (ID: ${evento.idSeleccionado})`);
  }

  fb = inject(FormBuilder);
  form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    urlImg: ['', [Validators.required]]
  });

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    this.selectedFileName = file.name;
    this.isUploading = true;
    this.cloudinary.upImg(file).subscribe({
      next: (res) => {
        this.previewUrl = res.secure_url;
        this.form.patchValue({
          urlImg: res.secure_url
        });
        this.isUploading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
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

    this.categoryService.createProduct(productDto).subscribe({
      next: (data) => {
        alert("Producto Cargado Exitantemente");
      },
      error: (err) => {
        console.error(err);
        alert("Algo malió sal al intentar guardar en el servidor");
      }
    });
  }
}