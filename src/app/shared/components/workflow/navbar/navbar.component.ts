import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {Ticket} from '../../../models/ticket.model';
import {TicketsService} from '../../../services/tickets/tickets.service';
import {Notification} from '../../../models/notification.model';
import {ProgressWebsocketService} from '../../../services/notification/progress.websocket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  tickets: Ticket[];
  searchText = '';
  notifications: Notification[] = [];
  user: User;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private ticketService: TicketsService,
              private progressWebsocketService: ProgressWebsocketService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.tickets = this.ticketService.tickets;
    if(JSON.parse(localStorage.getItem('notifications')) != null){
      this.notifications = JSON.parse(localStorage.getItem('notifications'));
    }
    this.initProgressWebSocket();

  }

  deleteNotification(id: string, type: string) {
    if(type === 'Message'){

    } else {
      this.router.navigate(['/ticket/'+id]).catch(error => console.log(error));
    }
    const index = this.notifications.findIndex(function(notification) {
      if(notification.id === id)
        {return true;}
    });

    this.notifications.splice(index, 1);
  }

  deleteAllNotifications(){
    this.notifications = [];
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }


  initProgressWebSocket = () => {
    const obs = this.progressWebsocketService.getObservable();
    obs.subscribe({
      next: this.onNewProgressMsg,
      error: err => {
        console.log(err);
      }
    });
  };

  ngOnDestroy(){
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/']).catch(error => console.log(error));
  }

  private onNewProgressMsg = receivedNotification => {
    if (receivedNotification.type === 'SUCCESS') {
      console.log(receivedNotification);
      if(this.notifications.length > 0){
        if(!this.verifyIfMessageIsAlreadyPresent(receivedNotification)){
          this.notifications.push(new Notification().deserialize(receivedNotification.message));
        }
      } else {
        this.notifications.push(new Notification().deserialize(receivedNotification.message));
      }
    }
  };

  private verifyIfMessageIsAlreadyPresent(receivedNotification): boolean{
    this.notifications.forEach(notification => {
      if(receivedNotification.message.id === notification.id &&
        receivedNotification.message.type === 'Message'){
        notification.occurence++;
        return true;
      }
    });
    return false;
  }

}
