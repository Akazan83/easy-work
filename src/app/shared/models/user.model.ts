export class User {
  id: string;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  messagesNumber: number;
  token?: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
