import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../services/order.service";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.scss"]
})
export class MyOrdersComponent implements OnInit {
  orders: any;

  constructor(private orderService: OrderService) {}

  async ngOnInit() {
    await this.orderService.getAllOrders();
    this.orders = this.orderService.orders;
  }
}
