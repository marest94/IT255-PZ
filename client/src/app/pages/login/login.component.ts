import { Component, OnInit } from "@angular/core";

import { MessageService } from "../../services/message.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  email = "";
  password = "";

  btnDisabled = false;

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  validate() {
    if (this.email) {
      if (this.password) {
        return true;
      } else {
        this.messageService.error("Password is not entered");
      }
    } else {
      this.messageService.error("Email is not entered.");
    }
  }

  async login() {
    this.btnDisabled = true;
    if (this.validate()) {
      await this.userService.login(this.email, this.password);
    }
    this.btnDisabled = false;
  }
}
