import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { AlgoliaService } from "../../services/algolia.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  query: string;
  page = 1;

  content: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private algoliaService: AlgoliaService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.query = res["query"];
      this.page = 1;
      this.getProducts();
    });
  }

  get lower() {
    return 1 + this.content.hitsPerPage * this.content.page;
  }

  get upper() {
    return Math.min(
      this.content.hitsPerPage * (this.content.page + 1),
      this.content.nbHits
    );
  }

  async getProducts() {
    this.content = null;
    await this.algoliaService.search(this.query, this.page);
    this.content = this.algoliaService.content;
  }
}
