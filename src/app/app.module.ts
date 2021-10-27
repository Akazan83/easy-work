import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { ForgotComponent } from './home/forgot/forgot.component';
import { RegisterComponent } from './home/register/register.component';
import { HomeModule } from './home/home.module';
import { HomeApplicationComponent } from './workflow/home-application/home-application.component';
import { ValidateTicketsComponent } from './workflow/validate-tickets/validate-tickets.component';
import { RefusedTicketsComponent } from './workflow/refused-tickets/refused-tickets.component';
import { WaitingTicketsComponent } from './workflow/waiting-tickets/waiting-tickets.component';
import { NewTicketsComponent } from './workflow/new-tickets/new-tickets.component';
import { TicketComponent } from './workflow/ticket/ticket.component';
import { NotificationComponent } from './workflow/navbar/notification/notification.component';
import { MessengerComponent } from './workflow/messenger/messenger.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './workflow/navbar/navbar.component';
import {ConversationComponent} from './workflow/messenger/conversation/conversation.component';
import { MessageComponent } from './workflow/messenger/conversation/message/message.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailTicketComponent } from './workflow/detail-ticket/detail-ticket.component';
import { AccountComponent } from './workflow/navbar/account/account.component';

const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent, RegisterComponent, ForgotComponent, HomeApplicationComponent, ValidateTicketsComponent,
    RefusedTicketsComponent, WaitingTicketsComponent, NewTicketsComponent, TicketComponent, NotificationComponent,
    MessengerComponent, NavbarComponent, ConversationComponent, MessageComponent, DetailTicketComponent, AccountComponent],
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
