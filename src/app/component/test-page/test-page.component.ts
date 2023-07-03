import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDatepickerModule,
  NgbTimepicker,
  NgbTimeStruct,
  NgbDropdown,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { TimeList } from 'src/app/models/time/timeList';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css'],
})
export class TestPageComponent implements OnInit {
  @ViewChild('#selectTime') input: ElementRef;

  model: NgbDateStruct;
  date: { year: number; month: number };
  Times: TimeList[] = [];
  public isCollapsed = false;
  constructor() {

  }

  ngOnInit(): void {
    this.loadTimeList();
  }

  loadTimeList() {
    this.Times = [
      { id: 1, hour: '00', minute: '00' },
      { id: 2, hour: '00', minute: '30' },
      { id: 1, hour: '01', minute: '00' },
      { id: 2, hour: '01', minute: '30' },
      { id: 1, hour: '02', minute: '00' },
      { id: 2, hour: '02', minute: '30' },
      { id: 1, hour: '03', minute: '00' },
      { id: 2, hour: '03', minute: '30' },
      { id: 1, hour: '04', minute: '00' },
      { id: 2, hour: '04', minute: '30' },
      { id: 1, hour: '05', minute: '00' },
      { id: 2, hour: '05', minute: '30' },
      { id: 1, hour: '06', minute: '00' },
      { id: 2, hour: '06', minute: '30' },
      { id: 1, hour: '07', minute: '00' },
      { id: 2, hour: '07', minute: '30' },
      { id: 1, hour: '08', minute: '00' },
      { id: 2, hour: '08', minute: '30' },
      { id: 1, hour: '09', minute: '00' },
      { id: 2, hour: '09', minute: '30' },
      { id: 1, hour: '10', minute: '00' },
      { id: 2, hour: '10', minute: '30' },
      { id: 1, hour: '11', minute: '00' },
      { id: 2, hour: '11', minute: '30' },
      { id: 1, hour: '12', minute: '00' },
      { id: 2, hour: '12', minute: '30' },
      { id: 1, hour: '13', minute: '00' },
      { id: 2, hour: '13', minute: '30' },
      { id: 1, hour: '14', minute: '00' },
      { id: 2, hour: '14', minute: '30' },
      { id: 1, hour: '15', minute: '00' },
      { id: 2, hour: '15', minute: '30' },
      { id: 1, hour: '16', minute: '00' },
      { id: 2, hour: '16', minute: '30' },
      { id: 1, hour: '17', minute: '00' },
      { id: 2, hour: '17', minute: '30' },
      { id: 1, hour: '18', minute: '00' },
      { id: 2, hour: '18', minute: '30' },
      { id: 1, hour: '19', minute: '00' },
      { id: 2, hour: '19', minute: '30' },
      { id: 1, hour: '20', minute: '00' },
      { id: 2, hour: '20', minute: '30' },
      { id: 1, hour: '21', minute: '00' },
      { id: 2, hour: '21', minute: '30' },
      { id: 1, hour: '22', minute: '00' },
      { id: 2, hour: '22', minute: '30' },
      { id: 1, hour: '23', minute: '00' },
      { id: 2, hour: '23', minute: '30' },
    ];
  }
}
