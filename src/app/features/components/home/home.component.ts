import { Component } from '@angular/core';
import { CarouselComponent } from "../carousel/carousel.component";
import { HomeProductsComponent } from "../home-products/home-products.component";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MainProductsComponent } from "../main-products/main-products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, HomeProductsComponent, NgxSpinnerModule, MainProductsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Track when child components are ready
  carouselReady = false;
  productsReady = false;

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show(); // show spinner immediately
  }

  // Call this from carousel component when it's ready
  onCarouselReady() {
    this.carouselReady = true;
    this.checkReady();
  }

  // Call this from home-products component when it's ready
  onProductsReady() {
    this.productsReady = true;
    this.checkReady();
  }

  private checkReady() {
    if (this.carouselReady && this.productsReady) {
      this.spinner.hide(); // hide spinner when both are ready
    }
  }
}
