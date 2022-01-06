import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketsService} from '../../../services/tickets/tickets.service';
import {Ticket} from '../../../models/ticket.model';
import {Participant} from '../../../models/participant.model';
import {Commentary} from '../../../models/commentarie.model';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TicketStateEnum} from '../ticket/ticketStateEnum';

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.scss']
})
export class DetailTicketComponent implements OnInit {
  ticket: Ticket;
  participants: Participant[];
  commentaries: Commentary[];
  users: User[];
  user: User;
  isOwner: boolean;
  searchText = '';
  id: number;
  closeResult = '';


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
              private userService: UserService,
              private modalService: NgbModal) { }

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
    const user: User = this.users.find(value => value.id === participantId);
    const newParticipant = new Participant();
    newParticipant.userId = user.id;
    newParticipant.firstName = user.firstName;
    newParticipant.lastName = user.lastName;
    newParticipant.status = TicketStateEnum.waiting;
    newParticipant.role = user.role;
    this.participants.push(newParticipant);
    this.searchText = '';
  }


  removeParticipant(participantId){
    this.participants = this.participants.filter(value => value.userId !== participantId);
  }

  get f() { return this.ticketForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.ticketForm.invalid) {
      return;
    }
    this.loading = true;
    const ticket = this.ticketFactory();

    this.ticketService.updateTicket(ticket, this.ticket.id)
      .pipe(first())
      .subscribe(
        () => {
          this.ticketService.init().then(()=>{
            this.router.navigate(['']).catch(error => this.error = error);
          });
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  saveComment(data){
    const dateNow =  new Date();
    const commentary = new Commentary();
    commentary.userId = this.currentUser.id;
    commentary.firstName = this.currentUser.firstName;
    commentary.lastName = this.currentUser.lastName;
    commentary.text = data.comment.value;
    commentary.sendingDate = dateNow.toLocaleString();

    this.commentaries.push(commentary);
    const ticket = this.ticketFactory();
    this.ticketService.postCommentarie(ticket, this.ticket.id).subscribe(() => console.log('Commentaire envoyé'));
  }

  changeParticipantStatus(status){
    this.participants.map(value => {
      if(value.userId === this.currentUser.id){
        value.status = status === 'Approved' ? TicketStateEnum.approved: TicketStateEnum.refused;
      }
    });

    const ticket = this.ticketFactory();
    this.ticketService.updateTicket(ticket, this.ticket.id).subscribe(() => console.log('Status mis à jour'));
  }

  openCommentForm(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  openCommentShow(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  private ticketFactory(){
    const ticket = new Ticket();
    ticket.title = this.f.title.value;
    ticket.description = this.f.description.value;
    ticket.status = this.ticket.status.toString();
    ticket.participants = this.participants;
    ticket.commentaries = this.commentaries;
    ticket.endDate = this.f.endDate.value;
    ticket.owner = this.ticket.owner;
    ticket.file = this.ticket.file;

    return ticket;
  }
}
