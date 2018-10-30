import { Component, OnInit } from "@angular/core";

import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-my-products",
  templateUrl: "./my-products.component.html",
  styleUrls: ["./my-products.component.scss"]
})
export class MyProductsComponent implements OnInit {
  products: any;

  constructor(
    private productService: ProductService
  ) {}

  async ngOnInit() {
    await this.productService.getAllSellerProducts();
    this.products = this.productService.products;
  }
  async removeProduct(id) {
    await this.productService.deleteProduct(id);
  }
}
