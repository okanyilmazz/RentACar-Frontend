import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardFormat'
})
export class CreditCardFormatPipe implements PipeTransform {
  transform(value: number): string {
    console.log(value)
    const stringValue = value.toString();
    console.log(stringValue)
    let formattedValue = '';

    for (let i = 0; i < stringValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += '-';
      }
      formattedValue += stringValue[i];
    }

    return formattedValue;
  }
}