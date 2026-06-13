import { Component } from "@angular/core";

@Component({
    selector: "app-banner",
    templateUrl: "./banner.html",
    styleUrls: ["./banner.css"],
    standalone: true
})
export class BannerComponent {
    imgs: string[] = [
    '/assets/carlosSoto.jpg',
    '/assets/wp12796710.jpg',
    '/assets/banner.jpg',
  ];

   currentIndex = 0;

  previus(): void {
    this.currentIndex =
      (this.currentIndex + 1) % this.imgs.length;
  }

  next(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.imgs.length)
      % this.imgs.length;
  }
    
}