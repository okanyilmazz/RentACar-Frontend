import { Component, OnInit } from '@angular/core';
import { faClock, faLock, faMap, faUsers, faUserSecret, faCar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.css']
})
export class WhatWeDoComponent implements OnInit {

  usersIcon=faUsers;
  securityIcon =faUserSecret;
  clockIcon=faClock;
  lockIcon =faLock;
  mapIcon =faMap;
  carIcon=faCar;
  constructor() { }

  ngOnInit(): void {
  }

}
