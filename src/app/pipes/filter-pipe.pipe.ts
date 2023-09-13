import { LocationDetailDto } from './../models/location/locationDetailsDto';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(
    value: LocationDetailDto[],
    filterText: string
  ): LocationDetailDto[] {
    try {
      if (filterText !== undefined) {
        filterText = filterText ? filterText.toLocaleLowerCase() : '';
        return filterText
          ? value.filter(
              (l: LocationDetailDto) =>
                l.title.toLocaleLowerCase().indexOf(filterText) !== -1
            )
          : value;
      } else {
        return null;
      }
    } catch (error) {return null}
  }
}
