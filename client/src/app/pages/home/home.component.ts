import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: any;

  constructor(private productService: ProductService) {}

  async ngOnInit() {
   await this.productService.getAllProducts();
   this.products = this.productService.products;
  }
}
