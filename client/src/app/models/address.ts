export class Address {
  public addr: string;
  public city: string;
  public state: string;
  public postalCode: string;
  public country: string;


  constructor(
    $address: string,
    $city: string,
    $state: string,
    $postalCode: string,
    $country: string
  ) {
    this.addr = $address;
    this.city = $city;
    this.state = $state;
    this.postalCode = $postalCode;
    this.country = $country;
  }
}
