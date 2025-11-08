import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { log } from 'console';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgxSpinnerModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productId!: string;
  product: any;
  subscription: any;
  isProduct: boolean = true;

  constructor(private _route: ActivatedRoute, private _productsService: ProductsService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    const id = this._route.snapshot.paramMap.get('id');
    if (!id) {
      this.spinner.hide();
      return;
    }
    this.productId = id;


    this.subscription = this._productsService.getProducts().subscribe((res: any) => {
      this.product = res.data.find((p: any) => p.id == id);
      if (!this.product) {
        this.isProduct = false;
      }
      this.spinner.hide();
      console.log(this.product);
    }, err => {
      this.spinner.hide();
      this.isProduct = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
