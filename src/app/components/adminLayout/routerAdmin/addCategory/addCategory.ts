import { Component, inject, OnInit, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, AsyncPipe } from '@angular/common';
import { CategoryTreeComponent } from "../category-tree/category-tree";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CategoryService, Category ,CategoryDto} from "../../../../services/hostinger/categoryService";
import { catchError, Observable, of } from "rxjs";

@Component({
  selector: 'app-addCategory',
  standalone: true,
  templateUrl: './addCategory.html',
  styleUrls: ['./addCategory.css'],
  imports: [CategoryTreeComponent, ReactiveFormsModule, AsyncPipe]
})
export class AddCategoryComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private platformId = inject(PLATFORM_ID);
  
  rutaEscogida: string = 'Ninguna';
  padreEscogido: number | null = null;
  categories$!: Observable<Category[]>;

  fb = inject(FormBuilder);
  form = this.fb.group({
    categoryName: ['', [Validators.required]],
    parentId: [null as number | null]
  });

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
    this.form.patchValue({ parentId: evento.idSeleccionado });
  }

  handleSubmit() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.form.invalid) {
      alert("Formulario inválido");
      return;
    }

    const categoryDto: CategoryDto = {
      categoryName: this.form.value.categoryName!,
      parentId: this.form.value.parentId!
    };

    this.categoryService.createCategory(categoryDto).subscribe({
      next: (res) => {
        console.log("creado", res);
        alert("Categoría creada exitosamente");
      },
      error: (err) => {
        console.error(err);
        alert("Categoria fallo miserablemente");
      }
    });
  }

  setParent() {
    this.form.patchValue({ parentId: null });
    this.handleSubmit();
  }
}