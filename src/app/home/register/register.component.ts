import { Component, OnInit } from '@angular/core';
import {ElectronService} from '../../core/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  electron: ElectronService;
  constructor() { }

  ngOnInit(): void {
    this.electron = new ElectronService();
  }

  closeApp(){
    this.electron.remote.getCurrentWindow().close();
  }

}
