import { Injectable } from "@angular/core";
import { MessageService } from "./message.service";
import { RestApiService } from "./rest-api.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  API_URL = "http://localhost:3030/api/accounts/orders/";

  order: any;
  orders: any;

  constructor(
    private messageService: MessageService,
    private rest: RestApiService,
    private router: Router
  ) {}

  async getSingleOrder(id: number) {
    await this.rest
      .get(this.API_URL + id)
      .then(data => {
        data["success"]
          ? (this.order = data["order"])
          : this.router.navigate(["/"]);
      })
      .catch(error => this.messageService.error(error["message"]));
  }

  async getAllOrders() {
    try {
      const data = await this.rest.get(this.API_URL);

      if (
        JSON.stringify(data["orders"]) === "{}" &&
        this.messageService.message === ""
      ) {
        this.messageService.warning("There are no orders");
      }
      this.orders = data["orders"];
      console.log(this.orders)
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }
}
