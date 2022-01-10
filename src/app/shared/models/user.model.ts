export class User {
  id: number;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken?: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
