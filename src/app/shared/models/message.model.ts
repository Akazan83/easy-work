import {Deserializable} from './deserializable';

export class Message implements Deserializable{
  id: string;
  sendingDate: string;
  senderId: string;
  receiverId: string;
  firstName: string;
  lastName: string;
  text: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
