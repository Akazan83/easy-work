import { Component, OnInit } from '@angular/core';
import {ElectronService} from '../../core/services';

@Component({
  selector: 'app-home-application',
  templateUrl: './home-application.component.html',
  styleUrls: ['./home-application.component.scss']
})
export class HomeApplicationComponent implements OnInit {
  electron: ElectronService;

  constructor() { }

  ngOnInit(): void {
    this.electron = new ElectronService();
    this.electron.remote.getCurrentWindow().setSize(1250,900);
    this.electron.remote.getCurrentWindow().setResizable(true);
  }

}
