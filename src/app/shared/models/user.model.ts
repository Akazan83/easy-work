export class User {
  id: number;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  token?: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
