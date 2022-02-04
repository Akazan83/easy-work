import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.scss']
})
export class DetailTicketComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;

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
  message: string;
  public fileOnServer: boolean;
  private loading = false;
  private error = '';

  constructor(private route: ActivatedRoute,
              private ticketService: TicketsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private modalService: NgbModal) {
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

    this.ticketService.updateTicket(ticket, this.ticket.id,'addNewParticipant').subscribe(() => this.message = 'Participant ajouté!');
  }


  removeParticipant(participantId){
    this.participants = this.participants.filter(value => value.userId !== participantId);

    const ticket = this.ticketFactory();
    this.ticketService.updateTicket(ticket, this.ticket.id,'removeParticipant').subscribe(() => this.message = 'Participant enlevé!');
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
    this.ticketService.updateTicket(ticket, this.ticket.id,'TicketUpdate')
      .pipe(first())
      .subscribe(() =>  this.message = 'Ticket mit à jour!');
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
    this.ticketService.updateTicket(ticket, this.ticket.id,'CommentaryUpdate').subscribe(() => this.message = 'Commentaire envoyé!');
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
    this.ticketService.updateTicket(ticket, this.ticket.id,'TicketApproved').subscribe(() => this.message = 'Status mis à jour');
  }

  openCommentForm(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  openCommentShow(longContent) {
    this.modalService.open(longContent, { scrollable: true });
    console.log(this.fileOnServer);
  }

  // FileUpload
  downloadAsPDF() {
    const html = htmlToPdfmake(
      '  <h1 style="text-align: center">' + this.ticket.title +'</h1>' +
      '  <h4 style="margin-top: 25px;">Résumé de la demande </h4>' + this.ticket.description +
      '  <h4 style="margin-top: 25px;">Date butoire  </h4> '+ this.ticket.endDate +
      '  <h4 style="margin-top: 25px;">Signataires numériques </h4>' +
      '  <table style="width: 250px;border-collapse: collapse;text-align:center;">' +
        this.getESignature() +
      '  </table>' +
      '</body>');

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }

  private getESignature(){
    let signature = '';
    this.participants.forEach(part => {
      signature += '<tr>'+'<td style="width: 200px; border: 1px solid #ddd;padding: 8px;">'+ part.firstName + ' ' + part.lastName +'</td>' +
        '<td style="width: 200px;color: #04AA6D; border: 1px solid #ddd;padding: 8px;">Bon pour Accord.</td> '+'</tr>';
    });
    return signature;
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
    ticket.ownerName = this.ticket.ownerName;
    ticket.file = this.ticket.file;

    return ticket;
  }
}
