import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  alerts = [
    {
      title: 'Vous avez un nouveau document en attente d\'approbation !',
      link: '',
      creationDate: '11 fevrier 2021',
      icon: 'fa-file-alt',
      bg: 'bg-primary'
    },
    {
      title: 'Le document n°1441186 arrive bientot en date butoire',
      link: '',
      creationDate: '12 fevrier 2021',
      icon: 'fa-exclamation-triangle',
      bg: 'bg-warning'
    },
    {
      title: 'Le document n°289614 a été approuvé !',
      link: '',
      creationDate: '13 fevrier 2021',
      icon: 'fa-file-alt',
      bg: 'bg-primary'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
