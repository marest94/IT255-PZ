import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { CategoryService } from "../../services/category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  categoryId: any;
  category: any;
  page = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  async ngOnInit() {
    await this.activatedRoute.params.subscribe(res => {
      this.categoryId = res["id"];
      this.getProducts();
    });
  }

  get lower() {
    return 10 * (this.page - 1) + 1;
  }

  get upper() {
    return Math.min(10 * this.page, this.category.totalProducts);
  }

  async getProducts(event?: any) {
    if (event) {
      this.category = null;
    }
    await this.categoryService.getSingleCategory(this.categoryId, this.page);
    this.category = this.categoryService.category;
  }
}
