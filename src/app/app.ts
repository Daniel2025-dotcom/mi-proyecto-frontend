import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/public-layout/nav/nav";
import { InfoNavComponent } from './components/public-layout/infoNav/infoNav';
import { ActionNavComponent } from './components/public-layout/actionNav/actionNav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('frontend');
}
