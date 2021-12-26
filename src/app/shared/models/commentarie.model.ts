import {Deserializable} from './deserializable.model';

export class Commentarie implements Deserializable{
  userId: number;
  firstName: string;
  lastName: string;
  text: string;
  dateEnvoi: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
