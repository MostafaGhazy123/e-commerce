import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-products',
  standalone: true,
  imports: [],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css'
})
export class HomeProductsComponent implements OnInit, OnDestroy {
  constructor(private _productsService: ProductsService, private _router: Router) { }
  arrOfProducts!: any;
  x!: any;
  @Output() ready = new EventEmitter<void>();
  ngOnInit() {
    this.x = this._productsService.getProducts().subscribe((y: any) => {
      this.arrOfProducts = y.data;
      console.log(this.arrOfProducts);
      this.ready.emit();
    });
  }
  ngOnDestroy() {
    this.x.unsubscribe();
  }
  goToProduct(id: string) {
    this._router.navigate(['/product', id]);
  }
}
