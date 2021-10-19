import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiting-tickets',
  templateUrl: './waiting-tickets.component.html',
  styleUrls: ['./waiting-tickets.component.scss']
})
export class WaitingTicketsComponent implements OnInit {

  tickets = [
    {
      title: 'test 1',
      reference: '27243872',
      creationDate: '12 fevrier 2021',
      endDate: '13 fevrier 2021'
    },
    {
      title: 'test 2',
      reference: '25364531',
      creationDate: '09 mars 2021',
      endDate: '15 mars 2021'
    },
    {
      title: 'test 3',
      reference: '23321464',
      creationDate: '28 juin 2021',
      endDate: '30 juin 2021'
    },
    {
      title: 'test 1',
      reference: '27243872',
      creationDate: '12 fevrier 2021',
      endDate: '13 fevrier 2021'
    },
    {
      title: 'test 2',
      reference: '25364531',
      creationDate: '09 mars 2021',
      endDate: '15 mars 2021'
    },
    {
      title: 'test 3',
      reference: '23321464',
      creationDate: '28 juin 2021',
      endDate: '30 juin 2021'
    },
    {
      title: 'test 1',
      reference: '27243872',
      creationDate: '12 fevrier 2021',
      endDate: '13 fevrier 2021'
    },
    {
      title: 'test 2',
      reference: '25364531',
      creationDate: '09 mars 2021',
      endDate: '15 mars 2021'
    },
    {
      title: 'test 3',
      reference: '23321464',
      creationDate: '28 juin 2021',
      endDate: '30 juin 2021'
    },
    {
      title: 'test 1',
      reference: '27243872',
      creationDate: '12 fevrier 2021',
      endDate: '13 fevrier 2021'
    },
    {
      title: 'test 2',
      reference: '25364531',
      creationDate: '09 mars 2021',
      endDate: '15 mars 2021'
    },
    {
      title: 'test 3',
      reference: '23321464',
      creationDate: '28 juin 2021',
      endDate: '30 juin 2021'
    },
  ];

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
