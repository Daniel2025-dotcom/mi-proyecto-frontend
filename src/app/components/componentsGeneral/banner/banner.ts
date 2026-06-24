import { Component, OnInit, OnDestroy } from "@angular/core";
import { interval, Subscription } from "rxjs"; // Importamos herramientas de RxJS

@Component({
    selector: "app-banner",
    templateUrl: "./banner.html",
    styleUrls: ["./banner.css"],
    standalone: true
})
export class BannerComponent implements OnInit, OnDestroy {
    imgs: string[] = [
        '/assets/carlosSoto.jpg',
        '/assets/wp12796710.jpg',
        '/assets/banner.jpg',
    ];
    currentIndex = 0;
    private timerSubscription!: Subscription; // Guardamos la suscripción

    ngOnInit(): void {
        // Crea un contador que emite cada 3000ms
        this.timerSubscription = interval(3000).subscribe(() => {
            this.next();
        });
    }

    ngOnDestroy(): void {
        // Nos desuscribimos para evitar fugas de memoria (memory leaks)
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    previous(): void {
        this.currentIndex = (this.currentIndex - 1 + this.imgs.length) % this.imgs.length;
    }

    next(): void {
        this.currentIndex = (this.currentIndex + 1) % this.imgs.length;
    }
}