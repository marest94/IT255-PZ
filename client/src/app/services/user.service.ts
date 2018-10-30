import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { MessageService } from "./message.service";
import { RestApiService } from "./rest-api.service";
import { Router } from "@angular/router";
import { Address } from "../models/address";

export const API_URL = "http://localhost:3030/api/accounts";

@Injectable()
export class UserService {
  user: User;
  address: Address;

  constructor(
    private messageService: MessageService,
    private rest: RestApiService,
    private router: Router
  ) {}

  async getProfile() {
    try {
      if (localStorage.getItem("token")) {
        const data = await this.rest.get(API_URL + "/profile");
        this.user = data["user"];
      }
    } catch (e) {
      this.messageService.error(e);
    }
  }
  async login(email: String, password: String) {
    try {
      const data = await this.rest.post(API_URL + "/login", {
        email: email,
        password: password
      });
      if (data["success"]) {
        localStorage.setItem("token", data["token"]);
        this.messageService.success("Login successful!");
        await this.getProfile();
        this.router.navigate(["/"]);
      } else {
        this.messageService.error(data["message"]);
      }
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }

  async register(user: User) {
    try {
      const data = await this.rest.post(API_URL + "/signup", user);
      if (data["success"]) {
        localStorage.setItem("token", data["token"]);
        this.messageService.success("Registration successful!");
        await this.getProfile();
        this.router.navigate(["/"]);
      } else {
        this.messageService.error(data["message"]);
      }
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }

  async getAddress() {
    try {
      const data = await this.rest.get(API_URL + "/address");
      if (
        JSON.stringify(data["address"]) === "{}" &&
        this.messageService.message === ""
      ) {
        this.messageService.warning(
          "You have not entered your shipping address. Please enter your shipping address."
        );
      }

      this.address = data["address"];
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }
  async updateAddress(address: Address) {
    try {
      const data = await this.rest.post(API_URL + "/address", address);
      data["success"]
        ? (this.messageService.success(data["message"]),
          await this.getProfile())
        : this.messageService.error(data["message"]);
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }

  async updateInfo(user: User) {
    try {
      const data = await this.rest.post(API_URL + "/profile", user);
      data["success"]
        ? (this.getProfile(), this.messageService.success(data["message"]))
        : this.messageService.error(data["message"]);
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }
}
