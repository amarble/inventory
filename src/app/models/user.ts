export class User {
  _id?: string;
  email: string;
  password: string;
  name: {
    first: string;
    last: string;
  };
}
