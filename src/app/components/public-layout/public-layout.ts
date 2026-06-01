import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavComponent } from './nav/nav';
import { InfoNavComponent } from './infoNav/infoNav';
import { ActionNavComponent } from './actionNav/actionNav';

@Component({
    selector: 'app-public-layout',
    standalone: true,

    imports: [
        RouterOutlet,
        NavComponent,
        InfoNavComponent,
        ActionNavComponent
    ],

    templateUrl: './public-layout.html',
    styleUrls: ['./public-layout.css']
})
export class PublicLayoutComponent {

}