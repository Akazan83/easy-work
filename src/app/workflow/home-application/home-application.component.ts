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
  }

}
