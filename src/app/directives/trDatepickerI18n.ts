import { Injectable } from "@angular/core";
import { NgbDatepickerI18n, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

const I18N_VALUES = {
  tr: {
    weekdays: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
    months: [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık'
    ]
  }
};

@Injectable()
export class TrDatepickerI18n extends NgbDatepickerI18n {
  getWeekdayLabel(weekday: number): string {
    return I18N_VALUES['tr'].weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return I18N_VALUES['tr'].months[month - 1];
  }

  getMonthFullName(month: number): string {
    return I18N_VALUES['tr'].months[month - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}