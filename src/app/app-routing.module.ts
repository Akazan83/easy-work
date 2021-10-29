import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { ForgotComponent } from './home/forgot/forgot.component';
import { RegisterComponent } from './home/register/register.component';
import {HomeRoutingModule} from './home/home-routing.module';
import {WaitingTicketsComponent} from './shared/components/workflow/waiting-tickets/waiting-tickets.component';
import {ValidateTicketsComponent} from './shared/components/workflow/validate-tickets/validate-tickets.component';
import {RefusedTicketsComponent} from './shared/components/workflow/refused-tickets/refused-tickets.component';
import {NewTicketsComponent} from './shared/components/workflow/new-tickets/new-tickets.component';
import {MessengerComponent} from './shared/components/workflow/messenger/messenger.component';
import {DetailTicketComponent} from './shared/components/workflow/detail-ticket/detail-ticket.component';
import {AccountComponent} from './shared/components/workflow/navbar/account/account.component';
import {AuthGuardService} from './services/authGuard/auth-guard.service';

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
    component: WaitingTicketsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'validateTicket',
    component: ValidateTicketsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'refusedTicket',
    component: RefusedTicketsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'newTicket',
    component: NewTicketsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'ticket/:id',
    component: DetailTicketComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'messenger',
    component: MessengerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuardService]
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
