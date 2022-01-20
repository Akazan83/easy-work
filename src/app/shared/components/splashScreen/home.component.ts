import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {WebsocketService} from "../../services/notification/websocket.service";
import {ProgressWebsocketService} from "../../services/notification/progress.websocket.service";
import {NotificationsService} from "../../services/notification/notifications.service";
import {RxStompService} from "@stomp/ng2-stompjs";

@Component({
  selector: 'app-splashscreen',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              /*private notif: NotificationsService*/) {

    // redirect to waitingTicket if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/waitingTicket']).catch(error => console.log(error));
    }
    //this.notif.initProgressWebSocket();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/waitingTicket';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]).catch(error => console.log(error));
        },
        () => {
          this.error = 'Email or Password incorrect';
          this.loading = false;
        });
  }
}
