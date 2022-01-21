import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MatSliderModule } from '@angular/material/slider';

import { AppComponent } from './app.component';
import { ForgotComponent } from './shared/components/splashScreen/forgot/forgot.component';
import { RegisterComponent } from './shared/components/splashScreen/register/register.component';
import { HomeModule } from './shared/components/splashScreen/home.module';
import { HomeApplicationComponent } from './shared/components/workflow/home-application/home-application.component';
import { ValidateTicketsComponent } from './shared/components/workflow/validate-tickets/validate-tickets.component';
import { RefusedTicketsComponent } from './shared/components/workflow/refused-tickets/refused-tickets.component';
import { WaitingTicketsComponent } from './shared/components/workflow/waiting-tickets/waiting-tickets.component';
import { NewTicketsComponent } from './shared/components/workflow/new-tickets/new-tickets.component';
import { TicketComponent } from './shared/components/workflow/ticket/ticket.component';
import { NotificationComponent } from './shared/components/workflow/navbar/notification/notification.component';
import { MessengerComponent } from './shared/components/workflow/messenger/messenger.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './shared/components/workflow/navbar/navbar.component';
import {ConversationComponent} from './shared/components/workflow/messenger/conversation/conversation.component';
import { MessageComponent } from './shared/components/workflow/messenger/conversation/message/message.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailTicketComponent } from './shared/components/workflow/detail-ticket/detail-ticket.component';
import { AccountComponent } from './shared/components/workflow/navbar/account/account.component';
import {TicketsFilterPipe} from './shared/services/filter/ticketsFilter.pipe';
import {UserService} from './shared/services/user/user.service';
import {UsersFilterPipe} from './shared/services/filter/userFilter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BasicAuthHtppInterceptorService} from './shared/services/httpInterceptor/BasicAuthHtppInterceptorService';
import { RxStompService  } from '@stomp/ng2-stompjs';
import {ProgressWebsocketService} from './shared/services/notification/progress.websocket.service';
import {MatBadgeModule} from '@angular/material/badge';
import {NotificationsService} from './shared/services/notification/notifications.service';

const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

export function initializeUsers(userService: UserService) {
  return (): Promise<any> => userService.init();
}

@NgModule({
  declarations: [AppComponent, RegisterComponent, ForgotComponent, HomeApplicationComponent, ValidateTicketsComponent,
    RefusedTicketsComponent, WaitingTicketsComponent, NewTicketsComponent, TicketComponent, NotificationComponent,
    MessengerComponent, NavbarComponent, ConversationComponent, MessageComponent, DetailTicketComponent, AccountComponent,
    TicketsFilterPipe, UsersFilterPipe],
  imports: [
    FontAwesomeModule,
    MatSliderModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule.forRoot(),
    HomeModule,
    AppRoutingModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    NgbModule,
    MatBadgeModule,
  ],
  providers: [
    //{ provide: APP,useFactory: initializeSocket, deps: [NotificationsService], multi: true},
    //{ provide: APP_INITIALIZER,useFactory: initializeUsers, deps: [UserService], multi: true}
    RxStompService,
    ProgressWebsocketService,
    { provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
