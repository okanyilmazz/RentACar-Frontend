import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { BodyType } from 'src/app/models/body-type/body-type';
import { BodyTypeService } from 'src/app/services/body-type/body-type.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnChanges {
  bodies: BodyType[] = [];
  currentBody: BodyType;
  emptyBody: BodyType;
  @Output() BodyEvent = new EventEmitter<boolean>();
  @Input() isOpenBody: boolean;
  constructor(private bodyService: BodyTypeService) {}

  ngOnInit(): void {
    this.getBody();
  }
  ngOnChanges() {}

  getBody() {
    this.bodyService.getBody().subscribe((response) => {
      this.bodies = response.data;
    });
  }

  setCurrentBody(body: BodyType) {
    this.isOpenBody = false; 
    this.BodyEvent.emit(this.isOpenBody);
    this.currentBody = body;
  }
  getCurrentBodyClass(body: BodyType) {
    if (body == this.currentBody) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllBodyClass() {
    if (!this.currentBody) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  clearCurrentBody() {
    this.currentBody = this.emptyBody;
  }
}
