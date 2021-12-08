import {Deserializable} from './deserializable.model';

export class Message implements Deserializable{
  id: number;
  dateEnvoi: string;
  userId: string;
  userName: string;
  text: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
