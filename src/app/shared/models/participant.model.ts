import {Deserializable} from './deserializable';
import {TicketStateEnum} from '../components/workflow/ticket/ticketStateEnum';

export class Participant implements Deserializable{
  userId: number;
  status: string = TicketStateEnum.waiting;
  firstName: string;
  lastName: string;
  role: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
