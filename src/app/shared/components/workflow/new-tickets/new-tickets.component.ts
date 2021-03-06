import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TicketsService} from '../../../services/tickets/tickets.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Participant} from '../../../models/participant.model';
import {TicketStateEnum} from '../ticket/ticketStateEnum';
import {Commentary} from '../../../models/commentary.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-new-tickets',
  templateUrl: './new-tickets.component.html',
  styleUrls: ['./new-tickets.component.scss']
})
export class NewTicketsComponent implements OnInit {
  public ticketForm: FormGroup;
  public submitted = false;
  public loading = false;
  public users: User[];
  public participants: Participant[] = [];
  public searchText = '';
  public message = '';
  private commentaries: Commentary[] = [];
  private currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  private error = '';

  constructor(private userService: UserService,
              private ticketService: TicketsService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });

    this.ticketForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      file: [null]
    });
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
    console.log(this.currentUser.firstName);
    this.ticketService.postNewTicket(this.f.title.value, this.f.description.value, this.f.endDate.value,
      this.participants, this.commentaries, this.f.file.value, this.currentUser.id, this.currentUser.firstName)
      .pipe(first())
      .subscribe(
        () => {
          this.ticketService.init().then(()=>{
            this.router.navigate(['']).catch(error => console.log(error));
          });
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}

