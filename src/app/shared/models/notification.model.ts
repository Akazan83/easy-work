import {Deserializable} from './deserializable';

export class Notification implements Deserializable{
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  type: string;
  creationDate: Date;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
