import {Deserializable} from './deserializable.model';

export class Participant implements Deserializable{
  userId: number;
  status: string;
  firstName: string;
  lastName: string;
  role: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
