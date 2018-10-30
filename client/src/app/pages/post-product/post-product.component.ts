import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { RestApiService } from "../../services/rest-api.service";
import { MessageService } from "../../services/message.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormControl,
  FormGroup
} from "@angular/forms";
import { CategoryService } from "../../services/category.service";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-post-product",
  templateUrl: "./post-product.component.html",
  styleUrls: ["./post-product.component.scss"]
})
export class PostProductComponent implements OnInit {
  product = {
    title: "",
    price: 0,
    categoryId: "",
    description: "",
    product_picture: null
  };

  categories: any;
  btnDisabled = false;

  newCategory = "";

  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  async ngOnInit() {
    this.getCategories();
  }

  openModal(event, addNewCategory) {
  if(event === 'Add new category'){
    this.modalService.open(addNewCategory, {
      ariaLabelledBy: "modal-basic-title"
    });
  }}
  
  async getCategories() {
    await this.categoryService.getAllCategories()
    this.categories = this.categoryService.categories;
  }

  async addCategory() {
    this.btnDisabled = true;
    await this.categoryService.addCategory(this.newCategory);
    this.getCategories();
    this.btnDisabled = false;
  }
  
  validate(product) {
    if (product.title) {
      if (product.price) {
        if (product.categoryId) {
          if (product.description) {
            if (product.product_picture) {
              return true;
            } else {
              this.messageService.error("Please select product image.");
            }
          } else {
            this.messageService.error("Please enter description.");
          }
        } else {
          this.messageService.error("Please select category.");
        }
      } else {
        this.messageService.error("Please enter a price.");
      }
    } else {
      this.messageService.error("Please enter a title.");
    }
  }

  fileChange(event: any) {
    this.product.product_picture = event.target.files[0];
  }

  async post() {
    this.btnDisabled = true;
      if (this.validate(this.product)) {
        const form = new FormData();
        for (const key in this.product) {
          if (this.product.hasOwnProperty(key)) {
            if (key === "product_picture") {
              form.append(
                "product_picture",
                this.product.product_picture,
                this.product.product_picture.name
              );
            } else {
              form.append(key, this.product[key]);
            }
          }
        }
        await this.productService.addProduct(form);
      }
    this.btnDisabled = false;
  }

}
