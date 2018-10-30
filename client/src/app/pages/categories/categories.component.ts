import { Component, OnInit } from "@angular/core";

import { CategoryService } from "../../services/category.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit {
  categories: any;

  constructor(private categoryService: CategoryService) {}

  async ngOnInit() {
    await this.categoryService.getAllCategories();
    this.categories = this.categoryService.categories;
  }
}
