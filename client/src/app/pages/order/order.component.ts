import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../../services/order.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"]
})
export class OrderComponent implements OnInit {
  order: any;
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    await this.activatedRoute.params.subscribe(res => {
      this.id = res["id"];
    });
    this.getProduct();
  }

  async getProduct() {
    await this.orderService.getSingleOrder(this.id);
    this.order = this.orderService.order;
    console.log(this.order);
  }
}
