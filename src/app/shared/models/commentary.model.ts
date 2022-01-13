import {Deserializable} from './deserializable';

export class Commentary implements Deserializable{
  userId: string;
  firstName: string;
  lastName: string;
  text: string;
  sendingDate: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
