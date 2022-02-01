import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketsService} from '../../../services/tickets/tickets.service';
import {Ticket} from '../../../models/ticket.model';
import {Participant} from '../../../models/participant.model';
import {Commentary} from '../../../models/commentary.model';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TicketStateEnum} from '../ticket/ticketStateEnum';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileuploadingService} from '../../../services/fileUpload/FileuploadingService';

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
  id: string;
  closeResult = '';
  isUpdatable = false;


  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  file: File;
  fileName = '';
  ticketForm: FormGroup;
  submitted = false;
  private loading = false;
  private error = '';

  // FileUpload
  private selectedFiles?: FileList;
  private currentFile?: File;
  private progress = 0;
  private message = '';
  private fileInfos?: Observable<any>;

  constructor(private route: ActivatedRoute,
              private ticketService: TicketsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private modalService: NgbModal,
              private fileuploadingService: FileuploadingService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.ticketService.getTicket(this.id)
      .subscribe(ticket => {
        this.ticket = ticket;
        this.participants = ticket.participants;
        this.commentaries = ticket.commentaries;
        this.isOwner = this.user.id === this.ticket.owner;

        //this.fileInfos = this.fileuploadingService.getFiles(this.ticket.id).subscribe(t => this.fileInfos = t);
        this.fileuploadingService.getFiles(this.ticket.id).pipe(t => {
          this.fileInfos = t;
          console.log(this.fileInfos);
          console.log(t);
          return t;
        });

        this.ticketForm = this.formBuilder.group({
          title: [this.ticket.title, Validators.required],
          description: [this.ticket.description, Validators.required],
          endDate: [this.ticket.endDate, Validators.required],
          file: [null]
        });
       this.ticketForm.valueChanges.subscribe(() => this.isUpdatable = true);
    });
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
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
    const ticket = this.ticketFactory();

    this.ticketService.updateTicket(ticket, this.ticket.id,'addNewParticipant').subscribe(() => console.log('new Participant'));
  }


  removeParticipant(participantId){
    this.participants = this.participants.filter(value => value.userId !== participantId);

    const ticket = this.ticketFactory();
    this.ticketService.updateTicket(ticket, this.ticket.id,'removeParticipant').subscribe(() => console.log('Remove Participant'));
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
    console.log('Send');
    this.ticketService.updateTicket(ticket, this.ticket.id,'TicketUpdate')
      .pipe(first())
      .subscribe(() =>  this.router.navigate(['']).catch(error => this.error = error));
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
    this.ticketService.updateTicket(ticket, this.ticket.id,'CommentaryUpdate').subscribe(() => console.log('Commentaire envoyé'));
  }

  deleteTicket(){
    this.ticketService.deleteTicket(this.ticket.id).subscribe(() => this.router.navigate(['']).catch(error => this.error = error));
  }

  changeParticipantStatus(status){
    this.participants.map(value => {
      if(value.userId === this.currentUser.id){
        value.status = status === 'Approved' ? TicketStateEnum.approved: TicketStateEnum.refused;
      }
    });

    const ticket = this.ticketFactory();
    this.ticketService.updateTicket(ticket, this.ticket.id,'TicketApproved').subscribe(() => console.log('Status mis à jour'));
  }

  openCommentForm(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  openCommentShow(longContent) {
    this.modalService.open(longContent, { scrollable: true });
    console.log(this.fileInfos);
  }

  // FileUpload
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.fileuploadingService.upload(this.currentFile, this.ticket.id).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.fileuploadingService.getFiles(this.ticket.id);
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }

  private ticketFactory(){
    const ticket = new Ticket();
    ticket.id = this.ticket.id;
    ticket.title = this.f.title.value;
    ticket.description = this.f.description.value;
    ticket.status = this.ticket.status;
    ticket.participants = this.participants;
    ticket.commentaries = this.commentaries;
    ticket.endDate = this.f.endDate.value;
    ticket.owner = this.ticket.owner;
    ticket.file = this.ticket.file;

    return ticket;
  }
}
