import { ColorService } from './../../services/color/color.service';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color/color';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  dataLoaded = false;

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColor();
  }

  getColor() {
    this.colorService.getColor().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
}