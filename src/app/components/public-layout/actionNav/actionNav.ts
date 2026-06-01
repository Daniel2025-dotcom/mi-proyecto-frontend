import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-action-nav",
    templateUrl: "./actionNav.html",
    styleUrls: ["./actionNav.css"],
    standalone: true,
    imports: [CommonModule]
})
export class ActionNavComponent {
    selectedCategory: string | null = null;

    selectCategory(category: string) {
        this.selectedCategory = category;
    }
}