import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderCompoent } from './header/header'; // Tu componente Header

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, HeaderCompoent],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayoutComponent implements OnInit {
  private router = inject(Router);

  isAdmin: boolean = false;
  userName: string = 'Invitado';

  ngOnInit(): void {
    this.isAdmin = this.router.url.includes('/admin');

    if (this.isAdmin) {
      this.userName = 'Gerbacio Admin';
    } else {
      this.userName = 'Cliente';
    }
  }
}