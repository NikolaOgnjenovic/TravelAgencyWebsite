import { Pipe, PipeTransform } from '@angular/core';
import {Agency} from "./objects/Agency";

@Pipe({
  name: 'agencySearchFilter'
})
export class AgencySearchFilterPipe implements PipeTransform {
  transform(agencies: Agency[], agencyName: string, destinationName: string): Agency[] {
    let returnValue = agencies;
    if (destinationName.length > 0) {
      destinationName = destinationName.toLowerCase();
      console.log(destinationName);
      returnValue.forEach(a => {
        a.filteredDestinations = a.destinations.filter(d => d.name.toLowerCase().includes(destinationName));
      });
      returnValue = returnValue.filter(a => a.filteredDestinations.length > 0);
    }
    if (agencyName.length > 0) {
      agencyName = agencyName.toLowerCase();
      returnValue = returnValue.filter(a => a.name.toLowerCase().includes(agencyName));
    }
    return returnValue;
  }
}
