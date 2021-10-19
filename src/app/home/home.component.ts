import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ElectronService} from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  electron: ElectronService;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.electron = new ElectronService();
    this.electron.remote.getCurrentWindow().setSize(1200,549);
    this.electron.remote.getCurrentWindow().setResizable(false);
  }
}
