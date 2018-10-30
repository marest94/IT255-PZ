import { Component, OnInit } from "@angular/core";

import { MessageService } from "../../services/message.service";
import { User } from "../../models/user";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
  user: User;

  addUserForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    password1: new FormControl(),
    isSeller: new FormControl(false)
  });

  btnDisabled = false;

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  validate() {
    if (this.addUserForm.value.name) {
      if (this.addUserForm.value.email) {
        if (this.addUserForm.value.password) {
          if (this.addUserForm.value.password1) {
            if (
              this.addUserForm.value.password ===
              this.addUserForm.value.password1
            ) {
              return true;
            } else {
              this.messageService.error("Passwords do not match.");
            }
          } else {
            this.messageService.error("Confirmation Password is not entered");
          }
        } else {
          this.messageService.error("Password is not entered");
        }
      } else {
        this.messageService.error("Email is not entered.");
      }
    } else {
      this.messageService.error("Name is not entered.");
    }
  }

  async register() {
    this.btnDisabled = true;

    if (this.validate()) {
      await this.userService.register(
        new User(
          this.addUserForm.value.name,
          this.addUserForm.value.email,
          this.addUserForm.value.password,
          this.addUserForm.value.isSeller
        )
      );
    }
    this.btnDisabled = false;
  }
}
