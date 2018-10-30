import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "../../services/message.service";
import { CartService } from "../../services/cart.service";
import { ProductService } from "../../services/product.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Review } from "../../models/review";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  addReviewForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    rating: new FormControl()
  });

  btnDisabled = false;
  id: number;
  product: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.id = res["id"];
    });
    this.getProduct();
  }

  async getProduct(){
    await this.productService.getSingleProduct(this.id);
    this.product = this.productService.product;
  }
  
  addToCart() {
    this.cartService.addToCart(this.product)
      ? this.messageService.success("Product successfully added to cart.")
      : this.messageService.error("Product has already been added to cart.");
  }

  async postReview() {
    if (localStorage.getItem("token")) {
      this.btnDisabled = true;
      this.productService.postReview(
        new Review(
          this.product._id,
          this.addReviewForm.value.title,
          this.addReviewForm.value.description,
          this.addReviewForm.value.rating
        )
      );
      
    } else {
      this.router.navigate(["/login"]).then(() => {
        this.messageService.warning(
          "You need to login in order to review product."
        );
      });
    }
  }
}
