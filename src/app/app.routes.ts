import { Routes } from '@angular/router';
import { HomeComponent } from './components/componentsGeneral/generalRouter/home/home';
import { MainLayoutComponent } from './components/adminLayout/main-layout';
import { LoadProductComponent } from './components/adminLayout/routerAdmin/loadProduct/loadProduct';
import { AddCategoryComponent } from './components/adminLayout/routerAdmin/addCategory/addCategory';
import { LoginComponent } from './components/componentsGeneral/loginTemplate/login';
import { authGuard } from './guard/auth.guard';
import { ResultFilterComponent } from './components/componentsGeneral/resultFilter/resultFilter';

export const routes: Routes = [
    {
        path: '', 
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'productos/:categoria', component: ResultFilterComponent }
        ]
    },
    
    {
        path: 'admin',
        component: MainLayoutComponent,
        canActivateChild: [authGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'loadProduct', component: LoadProductComponent },
            { path: 'addCategory', component: AddCategoryComponent },
            { path: 'productos/:categoria', component: ResultFilterComponent },
            { path: 'modificar-producto/:id',component: LoadProductComponent,data: { isMod: true }
  }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];