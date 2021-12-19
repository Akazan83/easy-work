import {Deserializable} from './deserializable.model';

export class Message implements Deserializable{
  id: number;
  dateEnvoi: string;
  senderId: number;
  receiverId: number;
  firstName: string;
  lastName: string;
  text: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
