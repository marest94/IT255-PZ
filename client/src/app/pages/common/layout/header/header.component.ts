import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../../../services/user.service";
import { CartService } from "../../../../services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  searchTerm = "";
  isCollapsed = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: CartService
  ) {
    this.cartService.cartItems = this.cartService.getCart().length;
    this.userService.getProfile();
  }

  get token() {
    return localStorage.getItem("token");
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown) {
    dropdown.close();
  }

  logout() {
    this.userService.user = null;
    this.cartService.cartItems = 0;
    localStorage.clear();
    this.router.navigate([""]);
  }

  search() {
    if (this.searchTerm) {
      this.collapse();
      this.router.navigate(["search", { query: this.searchTerm }]);
    }
  }
}
