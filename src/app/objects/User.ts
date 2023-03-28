export class User {
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  birthday: Date;
  address: string;
  phoneNumber: number;
  id: number;

  constructor(user: any) {
    this.username = user.username;
    this.password = user.password;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.birthday = user.birthday;
    this.address = user.address;
    this.phoneNumber = user.phoneNumber;
    this.id = new Date().getTime();
  }
}
