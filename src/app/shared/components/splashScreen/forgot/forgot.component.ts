import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../../core/services';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  electron: ElectronService;
  constructor() { }

  ngOnInit(): void {
    this.electron = new ElectronService();
  }
}
