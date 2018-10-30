import { Injectable } from "@angular/core";
import { MessageService } from "./message.service";
import { RestApiService } from "./rest-api.service";
import { Router } from "@angular/router";
import { Review } from "../models/review";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  products: any;
  product: any;

  PRODUCT_API_URL = "http://localhost:3030/api/products/";
  SELLER_PRODUCT_API_URL = "http://localhost:3030/api/seller/products/";
  REVIEW_API_URL = "http://localhost:3030/api/review";
  constructor(
    private messageService: MessageService,
    private rest: RestApiService,
    private router: Router
  ) {}

  async getAllSellerProducts() {
    try {
      const data = await this.rest.get(this.SELLER_PRODUCT_API_URL);
      data["success"]
        ? (this.products = data["products"])
        : this.messageService.error(data["message"]);
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }

  async getAllProducts() {
    try {
      const data = await this.rest.get(this.PRODUCT_API_URL);
      data["success"]
        ? (this.products = data["products"])
        : this.messageService.error("Could not fetch products.");
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }

  async getSingleProduct(id: number) {
    try {
      const data = await this.rest.get(this.PRODUCT_API_URL + id);
      data["success"]
        ? (this.product = data["product"])
        : this.messageService.error("Could not fetch products.");
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }
  async addProduct(product: FormData) {
    try {
      const data = await this.rest.post(
        "http://localhost:3030/api/seller/products",
        product
      );
      data["success"]
        ? this.router
            .navigate(["/profile/myproducts"])
            .then(() => this.messageService.success(data["message"]))
            .catch(error => this.messageService.error(error))
        : this.messageService.error(data["message"]);
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }
  
  async deleteProduct(id: number) {
    await this.rest
      .delete(this.SELLER_PRODUCT_API_URL + id)
      .then(data => {
        data["success"];
        this.messageService.success(data["message"]);
        location.reload();
      })
      .catch(error => this.messageService.error(error["message"]));
  }
  async updateProduct(product: FormData) {
    try {
      const data = await this.rest.post(
        "http://localhost:3030/api/seller/products/edit",
        product
      );
      data["success"]
        ? this.router
            .navigate(["/profile/myproducts"])
            .then(() => this.messageService.success(data["message"]))
            .catch(error => this.messageService.error(error))
        : this.messageService.error(data["message"]);
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }

  async postReview(review: Review) {
    try {
      const data = await this.rest.post(this.REVIEW_API_URL, review);
      data["success"]
        ? this.messageService.success(data["message"])
        : this.messageService.error(data["message"]);
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }
}
