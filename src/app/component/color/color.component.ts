import { ColorService } from './../../services/color/color.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color } from 'src/app/models/color/color';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[];
  dataLoaded = false;
  emptyColor: Color;
  currentColor: Color;
  @Output() ColorEvent = new EventEmitter<boolean>();
  @Input() isOpenColor: boolean;

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColor();
  }

  getColor() {
    this.colorService.getColor().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getAllColorClass() {
    if (!this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  setCurrentColor(color: Color) {
    this.isOpenColor = false;
    this.ColorEvent.emit(this.isOpenColor);

    this.currentColor = color;
  }

  clearCurrentColor() {
    this.currentColor = this.emptyColor;
  }
}
