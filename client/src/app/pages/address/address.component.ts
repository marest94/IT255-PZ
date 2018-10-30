import { Component, OnInit } from "@angular/core";

import { Address } from "../../models/address";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"]
})
export class AddressComponent implements OnInit {
  btnDisabled = false;

  currentAddress: Address;

  addAddressForm = new FormGroup({
    addr: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    postalCode: new FormControl(),
    country: new FormControl()
  });
  constructor(private userService: UserService) {}

  async ngOnInit() {
    await this.userService.getAddress();
    this.currentAddress = this.userService.address;
    this.addAddressForm = new FormGroup({
      addr: new FormControl(this.currentAddress.addr),
      city: new FormControl(this.currentAddress.city),
      state: new FormControl(this.currentAddress.state),
      postalCode: new FormControl(this.currentAddress.country),
      country: new FormControl(this.currentAddress.country)
    });
  }

  async updateAddress() {
    this.btnDisabled = true;
    this.userService.updateAddress(
      new Address(
        this.addAddressForm.value.addr,
        this.addAddressForm.value.city,
        this.addAddressForm.value.state,
        this.addAddressForm.value.postalCode,
        this.addAddressForm.value.country
      )
    );

    this.btnDisabled = false;
  }
}
