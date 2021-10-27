import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { ForgotComponent } from './home/forgot/forgot.component';
import { RegisterComponent } from './home/register/register.component';
import {HomeRoutingModule} from './home/home-routing.module';
import {HomeApplicationComponent} from './workflow/home-application/home-application.component';
import {WaitingTicketsComponent} from './workflow/waiting-tickets/waiting-tickets.component';
import {ValidateTicketsComponent} from './workflow/validate-tickets/validate-tickets.component';
import {RefusedTicketsComponent} from './workflow/refused-tickets/refused-tickets.component';
import {NewTicketsComponent} from './workflow/new-tickets/new-tickets.component';
import {MessengerComponent} from "./workflow/messenger/messenger.component";
import {DetailTicketComponent} from "./workflow/detail-ticket/detail-ticket.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot',
    component: ForgotComponent
  },
  {
    path: 'waitingTicket',
    component: WaitingTicketsComponent
  },
  {
    path: 'validateTicket',
    component: ValidateTicketsComponent
  },
  {
    path: 'refusedTicket',
    component: RefusedTicketsComponent
  },
  {
    path: 'newTicket',
    component: NewTicketsComponent
  },
  {
    path: 'ticket/:id',

    component: DetailTicketComponent,
  },
  {
    path: 'messenger',
    component: MessengerComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
