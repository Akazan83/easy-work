import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketsService} from '../../../services/tickets/tickets.service';
import {Ticket} from '../../../models/ticket.model';
import {Participant} from '../../../models/participant.model';
import {Commentarie} from '../../../models/commentarie.model';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.scss']
})
export class DetailTicketComponent implements OnInit {
  ticket: Ticket;
  participants: Participant[];
  commentaries: Commentarie[];
  users: User[];
  user: User;
  isOwner: boolean;
  searchText = '';
  id: number;


  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  file: File;
  fileName = '';
  ticketForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';

  constructor(private route: ActivatedRoute,
              private ticketService: TicketsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.users;
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.getTicket(this.id)
      .subscribe(ticket => {
        this.ticket = ticket;
        this.participants = ticket.participants;
        this.commentaries = ticket.commentaries;
        this.isOwner = this.user.id === this.ticket.owner;

        this.ticketForm = this.formBuilder.group({
          title: [this.ticket.title, Validators.required],
          description: [this.ticket.description, Validators.required],
          endDate: [this.ticket.endDate, Validators.required],
          file: [null]
        });
    });
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  addParticipant(participantId){
    // @ts-ignore
    this.participants.push(this.users[this.users.findIndex(user => user.id === participantId)]);
    this.searchText = '';
  }

  removeParticipant(participantId){
    this.participants.splice(this.users[this.users.findIndex(user => user.id === participantId)] as unknown as number,1);
  }

  get f() { return this.ticketForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ticketForm.invalid) {
      return;
    }
    this.loading = true;

    this.ticketService.updateTicket(this.f.title.value, this.f.description.value, this.f.endDate.value,
    this.participants, this.commentaries, this.f.file.value, this.currentUser.id, this.ticket.reference,
    this.id)
      .pipe(first())
      .subscribe(
        data => {
          this.ticketService.init().then(()=>{
            this.router.navigate(['']);
          });
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
