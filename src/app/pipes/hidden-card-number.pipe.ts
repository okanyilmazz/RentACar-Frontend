import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hiddenCardNumber'
})
export class HiddenCardNumberPipe implements PipeTransform {

  transform(value: any, count: number): string {
    if (typeof value === 'string') {
      // Tireleri ve boşlukları kaldırarak sayısal değeri çıkarma
      const numericValue = value.replace(/[-\s]/g, '');
      const visiblePart = numericValue.slice(-count);
      const hiddenPart = '*'.repeat(numericValue.length - count);
  
      // Değerleri '-' ile gruplayarak istenen formata dönüştürme
      const formattedValue = hiddenPart + visiblePart;
      const formattedGroups = [];
      for (let i = 0; i < formattedValue.length; i += 4) {
        formattedGroups.push(formattedValue.slice(i, i + 4));
      }
      return formattedGroups.join('-');
    } else {
      return value.toString();
    }
  }

}
