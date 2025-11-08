import { Component, OnInit, OnDestroy, output, EventEmitter, Output } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, NgxSpinnerModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  products: { title: string; img: string }[] = [];
  private sub?: Subscription;
  @Output() ready = new EventEmitter<void>();

  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {

    this.sub = this.productsService.getCatogeries().subscribe({
      next: (res: any) => {
        this.products = res.data.map((cat: any) => ({
          title: cat.name,
          img: cat.image
        }));
        this.ready.emit();
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.ready.emit();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  customOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 2 },
      576: { items: 3 },
      768: { items: 5 },
      992: { items: 6 },
      1200: { items: 8 }
    }
  };
}
