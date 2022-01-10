import {Deserializable} from './deserializable';

export class Message implements Deserializable{
  id: number;
  sendingDate: string;
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
