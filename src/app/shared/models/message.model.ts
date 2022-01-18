import {Deserializable} from './deserializable';

export class Message implements Deserializable{
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  senderName: string;
  recipientName: string;
  content: string;
  timestamp: Date;
  status: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
