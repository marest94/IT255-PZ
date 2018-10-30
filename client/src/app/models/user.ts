export class User {
  public name: string;
  public email: string;
  public password: string;
  public isSeller: boolean;

  constructor(
    $name: string,
    $email: string,
    $password: string,
    $isSeller: boolean
  ) {
    this.name = $name;
    this.email = $email;
    this.password = $password;
    this.isSeller = $isSeller;
  }

  
}
