import {Deserializable} from './deserializable';

export class Notification implements Deserializable{
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  type: string;
  creationDate: Date;
  occurence: number;

  deserialize(input: any) {
    Object.assign(this, input);
    this.occurence = 1;
    return this;
  }
}
