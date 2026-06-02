import { Component } from '@angular/core';
import { SearchComponent } from '../../adminLayout/header/search/serach';
import { RouterModule } from '@angular/router';
import { ButtonCategoryComponent } from "../../componentsGeneral/buttonCategory/buttonCategory";
@Component({
  selector: 'app-headerUser',
  standalone: true,
  templateUrl: './headerUser.html',
  styleUrls: ['./headerUser.css'],
  imports: [SearchComponent, RouterModule, ButtonCategoryComponent],
})
export class HeaderComponentUser {

}
