import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TicketsService} from '../../../services/tickets/tickets.service';
import {first} from 'rxjs/operators';
import {Commentarie} from '../../../models/commentarie.model';

@Component({
  selector: 'app-new-tickets',
  templateUrl: './new-tickets.component.html',
  styleUrls: ['./new-tickets.component.scss']
})
export class NewTicketsComponent implements OnInit {
  users: User[];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  participants = [];
  commentaries = new Array(0);
  file: File;
  fileName = '';
  searchText = '';
  ticketForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';

  constructor(private userService: UserService,
              private ticketService: TicketsService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.users = this.userService.users;

    this.ticketForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  addParticipant(participantId){
    this.participants.push(this.users[this.users.findIndex(user => user.id === participantId)]);
    this.searchText = '';
  }

  removeParticipant(participantId){
    this.participants.splice(this.users[this.users.findIndex(user => user.id === participantId)] as unknown as number,1);
  }

  uploadFile(event) {
    const reader = new FileReader();
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      this.file = fileList[0];
      reader.readAsDataURL(fileList[0]);
      reader.onload = () => {
        this.ticketForm.patchValue({
          file: reader.result
        });
      };
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
        data => {
          console.log('OK');
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}

