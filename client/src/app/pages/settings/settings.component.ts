import { Component, OnInit } from "@angular/core";

import { MessageService } from "../../services/message.service";
import { UserService } from "../../services/user.service";
import {
  FormGroup,
  FormControl
} from "@angular/forms";
import { User } from "../../models/user";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
  user: User;
  btnDisabled = false;
  currentSettings: any;

  updateInfoForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    newPwd: new FormControl(),
    confirmPwd: new FormControl(),
    isSeller: new FormControl(false)
  });

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    try {
      await this.userService.getProfile();
      this.user = this.userService.user;
      this.updateInfoForm = new FormGroup({
        name: new FormControl(this.user.name),
        email: new FormControl(this.user.email),
        newPwd: new FormControl(""),
        confirmPwd: new FormControl(""),
        isSeller: new FormControl(this.user.isSeller)
      });
    } catch (error) {
      this.messageService.error(error);
    }
  }

  validate() {
    if (this.updateInfoForm.value.name) {
      if (this.updateInfoForm.value.email) {
        if (this.updateInfoForm.value.newPwd) {
          if (this.updateInfoForm.value.confirmPwd) {
            if (
              this.updateInfoForm.value.password ===
              this.updateInfoForm.value.password1
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

  async update() {
    this.btnDisabled = true;

    if (this.validate()) {
      await this.userService.updateInfo(
        new User(
          this.updateInfoForm.value.name,
          this.updateInfoForm.value.email,
          this.updateInfoForm.value.newPwd,
          this.updateInfoForm.value.isSeller
        )
      );
    }
    this.btnDisabled = false;
  }
}
