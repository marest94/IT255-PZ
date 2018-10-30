export class Product {
  public title: string;
  public price: number;
  public categoryId: string;
  public description: string;
  public product_picture: File;

  constructor(
    $title: string,
    $price: number,
    $categoryId: string,
    $description: string,
    $product_picture: File
  ) {
    this.title = $title;
    this.price = $price;
    this.categoryId = $categoryId;
    this.description = $description;
    this.product_picture = $product_picture;
  }
}
