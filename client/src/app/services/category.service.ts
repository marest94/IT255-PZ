import { Injectable } from "@angular/core";
import { MessageService } from "./message.service";
import { RestApiService } from "./rest-api.service";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  categories: any;
  category: any;

  API_URL = "http://localhost:3030/api/categories/";
  constructor(
    private messageService: MessageService,
    private rest: RestApiService
  ) {}

  async getAllCategories() {
    try {
      const data = await this.rest.get(this.API_URL);
      data["success"]
        ? (this.categories = data["categories"])
        : this.messageService.error(data["message"]);
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }
  async getSingleCategory(id: any, page: number) {
    try {
      const data = await this.rest.get(
        this.API_URL + id + "?page=" + `${page - 1}`
      );
      data["success"]
        ? (this.category = data)
        : this.messageService.error(data["message"]);
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }
  async addCategory(category: String) {
    try {
      const data = await this.rest.post(this.API_URL, { category: category });
      data["success"]
        ? this.messageService.success(data["message"])
        : this.messageService.error(data["message"]);
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }
}
