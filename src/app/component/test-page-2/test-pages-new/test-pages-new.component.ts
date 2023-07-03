import { JsonPipe, Time } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faInbox, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { LocationDetailDto } from 'src/app/models/location/locationDetailsDto';
import { TimeList } from 'src/app/models/time/timeList';
const states = [
	'Alabama',
	'Alaska',
	'American Samoa',
	'Arizona',
	'Arkansas',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'District Of Columbia',
	'Federated States Of Micronesia',
	'Florida',
	'Georgia',
	'Guam',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Marshall Islands',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Northern Mariana Islands',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Palau',
	'Pennsylvania',
	'Puerto Rico',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virgin Islands',
	'Virginia',
	'Washington',
	'West Virginia',
	'Wisconsin',
	'Wyoming',
];

@Component({
  selector: 'app-test-pages-new',
  templateUrl: './test-pages-new.component.html',
  styleUrls: ['./test-pages-new.component.css'],
})

export class TestPagesNewComponent implements OnInit {
  model: any;

	@ViewChild('instance', { static: true }) instance: NgbTypeahead;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
		const inputFocus$ = this.focus$;

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) =>
				(term === '' ? states : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
			),
		);
	};
  
  contactSendForm: FormGroup;
  userIcon = faUser;
  mailIcon = faMailBulk;
  subjectIcon = faInbox;
  contactService: any;
  toastr: any;
  filterRentalText: string;
  filterReturnText: string;
  locations: LocationDetailDto[];
  isDifferentLocation = false;
  selectedRentalLocation: LocationDetailDto;
  selectedReturnLocation: LocationDetailDto;
  isRentalText: string;
  isReturnText: string;
  rentalDate: string;
  rentalTime: Time;
  returnDate: string;
  returnTime: Time;
  Times: TimeList[] = [];
  todaymin: Date = new Date();
  constructor() { }

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

  returnValueCheck() {
    this.isReturnText = this.filterReturnText;
  }
  rentalValueCheck() {
    this.isRentalText = this.filterRentalText;
  }
  rentalLocationClickX() {
    this.selectedRentalLocation = undefined;
  }
  returnLocationClickX() {
    this.selectedReturnLocation = undefined;
  }
  selectRentalLocation(location: LocationDetailDto) {
    this.selectedRentalLocation = location;
    this.filterRentalText = this.selectedRentalLocation.title;
    this.isRentalText = '';
  }

  selectReturnLocation(location: LocationDetailDto) {
    this.selectedReturnLocation = location;
    this.filterReturnText = this.selectedReturnLocation.title;
    this.isReturnText = '';
  }
}
