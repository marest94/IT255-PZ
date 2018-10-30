export class Review {
  public productId: string;
  public title: string;
  public description: string;
  public rating: number;

  constructor(
    $productId: string,
    $title: string,
    $description: string,
    $rating: number
  ) {
    this.productId = $productId;
    this.title = $title;
    this.description = $description;
    this.rating = $rating;
  }
}
