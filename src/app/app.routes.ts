import { Routes } from '@angular/router';
import { HomeComponent } from './features/components/home/home.component';
import { CartComponent } from './features/components/cart/cart.component';
import { ProductsComponent } from './features/components/products/products.component';
import { CategoryComponent } from './features/components/category/category.component';
import { BrandComponent } from './features/components/brand/brand.component';
import { LoginComponent } from './core/layout/login/login.component';
import { RegisterComponent } from './core/layout/register/register.component';
import { Component } from '@angular/core';
import { Error404Component } from './shared/components/error404/error404.component';
import { ProductDetailsComponent } from './features/components/product-details/product-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'cart', component: CartComponent, title: 'Shopping Cart' },
    { path: 'products', component: ProductsComponent, title: 'Products' },
    { path: 'categories', component: CategoryComponent, title: 'Categories' },
    { path: 'brands', component: BrandComponent, title: 'Brands' },
    { path: 'login', component: LoginComponent, title: 'Sign In' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'product/:id', component: ProductDetailsComponent, title: 'Product Details' },







    { path: '**', component: Error404Component },

];
