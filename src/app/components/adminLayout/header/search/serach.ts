import { Component, inject, OnInit, PLATFORM_ID } from "@angular/core"; // Agregamos PLATFORM_ID y OnInit
import { FormsModule } from "@angular/forms";
import { SearchService } from "../../../../services/hostinger/searchService";
import { isPlatformBrowser } from '@angular/common'; // Agregamos isPlatformBrowser

@Component({
    selector: 'app-search',
    templateUrl: './search.html',
    styleUrls: ['./search.css'],
    standalone: true,
    imports: [FormsModule]
})
export class SearchComponent implements OnInit {
    searchTerm: string = '';
    private searchService = inject(SearchService);
    private platformId = inject(PLATFORM_ID);

    isBrowser: boolean = false;

    ngOnInit(): void {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    onSearch(): void {
        if (!this.isBrowser) return;
        this.searchService.setSearchTerm(this.searchTerm.trim());
    }
}