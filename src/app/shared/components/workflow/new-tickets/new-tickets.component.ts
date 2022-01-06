import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TicketsService} from '../../../services/tickets/tickets.service';
import {first} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Participant} from '../../../models/participant.model';
import {TicketStateEnum} from '../ticket/ticketStateEnum';
import {Commentary} from '../../../models/commentarie.model';

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
  private file: File;
  private commentaries: Commentary[] = [];
  private currentUser = JSON.parse(localStorage.getItem('currentUser'));
  private fileName = '';
  private error = '';

  constructor(private userService: UserService,
              private ticketService: TicketsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.users = this.userService.users;

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

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);
      const upload$ = this.http.post('/api/messages', formData);
      upload$.subscribe();
    }
  }

  get f() { return this.ticketForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.ticketForm.invalid) {
      return;
    }
    this.loading = true;

    this.ticketService.postNewTicket(this.f.title.value, this.f.description.value, this.f.endDate.value,
      this.participants, this.commentaries, this.f.file.value, this.currentUser.id)
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

