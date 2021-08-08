import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';


import { AppComponent } from './app.component';
import { DeleteProductModalComponent } from './components/products/delete-product-modal/delete-product-modal.component';
import { AddOrEditProductModalComponent } from './components/products/add-or-edit-product-modal/add-or-edit-product-modal.component';
import { ShowProductComponent } from './components/products/show-product/show-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShowUserComponent } from './components/users/show-user/show-user.component';
import { DeleteUserComponent } from './components/users/delete-user/delete-user.component';
import { AddEditComponent } from './components/users/add-edit/add-edit.component';
import { ShowOrderComponent } from './components/orders/show-order/show-order.component';
import { DeleteOrderComponent } from './components/orders/delete-order/delete-order.component';
import { UsersService } from './services/users.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { ShowcategoryComponent } from './components/category/showcategory/showcategory.component';
import { DeletecategoryComponent } from './components/category/deletecategory/deletecategory.component';
import { AddcategoryComponent } from './components/category/addcategory/addcategory.component';
import { ShowtestdriveComponent } from './components/testdrive/showtestdrive/showtestdrive.component';
import { DeletetdComponent } from './components/testdrive/deletetd/deletetd.component';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}

const isAuth = false;
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',canActivate: [AuthGuard], component: DashboardComponent},
  {path:'showproducts',canActivate: [AuthGuard], component: ShowProductComponent},
  {path:'showusers',canActivate: [AuthGuard], component: ShowUserComponent},
  {path:'showorders',canActivate: [AuthGuard], component: ShowOrderComponent},
  {path:'showcategorys',canActivate: [AuthGuard], component: ShowcategoryComponent},
  {path:'showtestdrives',canActivate: [AuthGuard], component: ShowtestdriveComponent},
  {path:'profile',canActivate: [AuthGuard], component: ProfileComponent},

]
@NgModule({
  declarations: [
    AppComponent,
    DeleteProductModalComponent,
    AddOrEditProductModalComponent,
    ShowProductComponent,
    DashboardComponent,
    ProfileComponent,
    ShowUserComponent,
    DeleteUserComponent,
    AddEditComponent,
    ShowOrderComponent,
    DeleteOrderComponent,
    NavbarComponent,
    LoginComponent,
    ShowcategoryComponent,
    DeletecategoryComponent,
    AddcategoryComponent,
    ShowtestdriveComponent,
    DeletetdComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory:HttpLoaderFactory, 
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    RouterModule.forRoot(routes),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  isAuth = false;


  constructor( private UsersService: UsersService) { }


  ngOnInit(): void {
    this.isAuth = this.UsersService.isAuth;
  }

  logout(){

    this.UsersService.logout();
    this.isAuth = this.UsersService.isAuth;

  }
 }
