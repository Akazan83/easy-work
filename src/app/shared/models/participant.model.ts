import {Deserializable} from './deserializable.model';

export class Participant implements Deserializable{
  userId: number;
  status: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
