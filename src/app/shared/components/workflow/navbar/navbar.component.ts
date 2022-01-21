import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {Ticket} from '../../../models/ticket.model';
import {TicketsService} from '../../../services/tickets/tickets.service';
import {NotificationsService} from '../../../services/notification/notifications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  tickets: Ticket[];
  searchText = '';

  alerts = [
    {
      id: 1,
      title: 'Vous avez un nouveau document en attente d\'approbation !',
      link: '',
      creationDate: '11 fevrier 2021',
      icon: 'fa-file-alt',
      bg: 'bg-primary',
      seen : false
    },
    {
      id: 2,
      title: 'Le document n°1441186 arrive bientot en date butoire',
      link: '',
      creationDate: '12 fevrier 2021',
      icon: 'fa-exclamation-triangle',
      bg: 'bg-warning',
      seen : false
    },
    {
      id: 3,
      title: 'Le document n°289614 a été approuvé !',
      link: '',
      creationDate: '13 fevrier 2021',
      icon: 'fa-file-alt',
      bg: 'bg-primary',
      seen : true
    },
  ];
  user: User;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private ticketService: TicketsService,
              private notif: NotificationsService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.tickets = this.ticketService.tickets;

  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/']).catch(error => console.log(error));
  }

}
