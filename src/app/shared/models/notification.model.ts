import {Deserializable} from './deserializable';

export class Notification implements Deserializable{
  chatId: string;
  senderId: string;
  senderName: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
