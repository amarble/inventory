export class User {
  _id?: string;
  email: string;
  password: string;
  name?: {
    first?: string;
    last?: string;
  };
  level: number;
  reset?: {
    token: string;
    expires: Date;
  };

}
