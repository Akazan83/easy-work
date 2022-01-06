import {Deserializable} from './deserializable.model';

export class Commentary implements Deserializable{
  userId: number;
  firstName: string;
  lastName: string;
  text: string;
  sendingDate: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
