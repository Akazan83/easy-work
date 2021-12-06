import {Participant} from './participant.model';
import {Commentarie} from './commentarie.model';
import {Deserializable} from './deserializable.model';

export class Ticket implements Deserializable{
  id: number;
  owner: number;
  title: string;
  status: string;
  reference: string;
  creationDate: string;
  endDate: string;
  file: FormData;
  participants: Participant[];
  commentaries: Commentarie[];
  description: string;

  deserialize(input: any) {
    Object.assign(this, input);
    this.participants = input.participants.map(participant => new Participant().deserialize(participant));
    this.commentaries = input.commentaries.map(commentaries => new Commentarie().deserialize(commentaries));
    return this;
  }
}
