import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hiddenNumber',
})
export class HiddenNumberPipe implements PipeTransform {
  transform(value: any, count:number): string {
    if (!isNaN(value)) {
      const stringValue = value.toString();
      const visiblePart = stringValue.slice(-count);
      const hiddenPart = '*'.repeat(stringValue.length - count);
      return hiddenPart + visiblePart;
    } else {
      return value.toString();
    }
  }
}
