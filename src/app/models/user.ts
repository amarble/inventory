export class User {
  _required = ['email', 'password'];

  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
