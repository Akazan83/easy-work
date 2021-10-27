import {Deserializable} from './deserializable.model';

export class Commentarie implements Deserializable{
  userId: number;
  text: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
