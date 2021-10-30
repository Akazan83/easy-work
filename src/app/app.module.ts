import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MatSliderModule } from '@angular/material/slider';

import { AppComponent } from './app.component';
import { ForgotComponent } from './shared/components/home/forgot/forgot.component';
import { RegisterComponent } from './shared/components/home/register/register.component';
import { HomeModule } from './shared/components/home/home.module';
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
import {FilterPipe} from './shared/services/filter/filter.pipe';
import {TicketsService} from './shared/services/tickets/tickets.service';

const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

export function initializeApp1(ticketService: TicketsService) {
  return (): Promise<any> => ticketService.init();
}

@NgModule({
  declarations: [AppComponent, RegisterComponent, ForgotComponent, HomeApplicationComponent, ValidateTicketsComponent,
    RefusedTicketsComponent, WaitingTicketsComponent, NewTicketsComponent, TicketComponent, NotificationComponent,
    MessengerComponent, NavbarComponent, ConversationComponent, MessageComponent, DetailTicketComponent, AccountComponent,
    FilterPipe],
  imports: [
    FontAwesomeModule,
    MatSliderModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
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
  ],
  providers: [  TicketsService,
    { provide: APP_INITIALIZER,useFactory: initializeApp1, deps: [TicketsService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
