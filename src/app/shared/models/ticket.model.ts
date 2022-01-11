import {Participant} from './participant.model';
import {Commentary} from './commentary.model';
import {Deserializable} from './deserializable';

export class Ticket implements Deserializable{
  id: string;
  owner: string;
  title: string;
  status: string;
  reference: string;
  creationDate: string;
  endDate: string;
  file: FormData;
  participants: Participant[];
  commentaries: Commentary[];
  description: string;

  deserialize(input: any) {
    Object.assign(this, input);
    this.participants = input.participants.map(participant => new Participant().deserialize(participant));
    this.commentaries = input.commentaries.map(commentaries => new Commentary().deserialize(commentaries));
    return this;
  }
}
