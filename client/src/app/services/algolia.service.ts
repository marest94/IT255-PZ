import { Injectable } from "@angular/core";
import { RestApiService } from "./rest-api.service";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root"
})
export class AlgoliaService {
  API_URL = "http://localhost:3030/api/search?";

  content: any;
  constructor(
    private restService: RestApiService,
    private messageService: MessageService
  ) {}

  async search(query: String, page: number) {
    try {
      const data = await this.restService.get(
        this.API_URL + `query=${query}&page=${page - 1}`
      );
      data["success"]
        ? (this.content = data["content"])
        : this.messageService.error(data["message"]);
    } catch (error) {
      this.messageService.error(error["message"]);
    }
  }
}
