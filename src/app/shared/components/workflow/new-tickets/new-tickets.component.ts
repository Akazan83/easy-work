import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TicketsService} from '../../../services/tickets/tickets.service';
import {first} from 'rxjs/operators';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Participant} from '../../../models/participant.model';
import {TicketStateEnum} from '../ticket/ticketStateEnum';
import {Commentary} from '../../../models/commentary.model';
import {Observable} from 'rxjs';
import {FileuploadingService} from '../../../services/fileUpload/FileuploadingService';

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
  private commentaries: Commentary[] = [];
  private currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  private error = '';

  // FileUpload
  private selectedFiles?: FileList;
  private currentFile?: File;
  private progress = 0;
  private message = '';
  private fileInfos?: Observable<any>;

  constructor(private userService: UserService,
              private ticketService: TicketsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private http: HttpClient,
              private fileuploadingService: FileuploadingService) { }

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

  // FileUpload
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  upload(ticketId: string): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.fileuploadingService.upload(this.currentFile,ticketId).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Impossible d\'envoyer le fichier au serveur';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
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

    this.ticketService.postNewTicket(this.f.title.value, this.f.description.value, this.f.endDate.value,
      this.participants, this.commentaries, this.f.file.value, this.currentUser.id, this.currentUser.firstName)
      .pipe(first())
      .subscribe(
        ticket => {
          console.log( this.currentUser.firstName);
          //this.upload(ticket.id);
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

