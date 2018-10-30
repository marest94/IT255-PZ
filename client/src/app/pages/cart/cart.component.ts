import { Component, OnInit } from "@angular/core";

import { environment } from "../../../environments/environment";
import { MessageService } from "../../services/message.service";
import { RestApiService } from "../../services/rest-api.service";
import { Router } from "@angular/router";
import { CartService } from "../../services/cart.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  btnDisabled = false;
  handler: any;

  quantities = [];

  constructor(
    private messageService: MessageService,
    private rest: RestApiService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router
  ) {}

  trackByCartItems(index: number, item: any) {
    return item._id;
  }

  get cartItems() {
    return this.cartService.getCart();
  }

  get cartTotal() {
    let total = 0;
    this.cartItems.forEach((data, index) => {
      total += data["price"] * this.quantities[index];
    });
    return total;
  }

  removeProduct(index, product) {
    this.quantities.splice(index, 1);
    this.cartService.removeFromCart(product);
  }

  ngOnInit() {
    this.cartItems.forEach(data => {
      this.quantities.push(1);
    });
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      locale: "auto",
      token: async stripeToken => {
        let products;
        products = [];
        this.cartItems.forEach((d, index) => {
          products.push({
            product: d["_id"],
            quantity: this.quantities[index]
          });
        });

        try {
          const data = await this.rest.post(
            "http://localhost:3030/api/payment",
            {
              totalPrice: this.cartTotal,
              products,
              stripeToken
            }
          );

          data["success"]
            ? (this.cartService.clearCart(),
              this.messageService.success("Purchase Successful."))
            : this.messageService.error(data["message"]);
        } catch (error) {
          this.messageService.error(error["message"]);
        }
      }
    });
  }

  validate() {
    if (!this.quantities.every(data => data > 0)) {
      this.messageService.warning("Quantity cannot be less than one.");
    } else if (!localStorage.getItem("token")) {
      this.router.navigate(["/login"]).then(() => {
        this.messageService.warning(
          "You need to login before making a purchase."
        );
      });
    } else if (!this.userService.user["address"]) {
      this.router.navigate(["/profile/address"]).then(() => {
        this.messageService.warning(
          "You need to enter the shipping adress before making a purchase."
        );
      });
    } else {
      this.messageService.message = "";
      return true;
    }
  }

  checkout() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        this.handler.open({
          description: "Checkout Payment",
          amount: this.cartTotal * 100,
          closed: () => {
            this.btnDisabled = false;
          }
        });
      } else {
        this.btnDisabled = false;
      }
    } catch (error) {
      this.messageService.error(error);
    }
  }
}
