import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SearchService } from "../../../../services/hostinger/searchService";
@Component({
    selector: 'app-search',
    templateUrl: './search.html',
    styleUrls: ['./search.css'],
    standalone: true,
    imports: [FormsModule]
})
export class SearchComponent {
    searchTerm: string = '';
    private searchService = inject(SearchService);

    onSearch(): void {
        this.searchService.setSearchTerm(this.searchTerm.trim());
    }
}