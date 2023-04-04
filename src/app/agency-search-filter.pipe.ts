import { Pipe, PipeTransform } from '@angular/core';
import {Agency} from "./objects/Agency";
import {AgencyService} from "./agency.service";
import {Destination} from "./objects/Destination";

@Pipe({
  name: 'agencySearchFilter'
})
export class AgencySearchFilterPipe implements PipeTransform {
  allDestinations: Map<string, Destination>;
  constructor(agencyService: AgencyService) {
    this.allDestinations = agencyService.getDestinations();
  }
  transform(agencies: Map<string, Agency>, agencyName: string, destinationName: string): Map<string, Agency> {
    let returnValue: Map<string, Agency> = agencies;
    if (destinationName.length > 0) {
      destinationName = destinationName.toLowerCase();
      console.log(destinationName);
      returnValue.forEach(a => {
        a.filteredDestinations = new Map(Array.from(this.allDestinations).filter(([key, val]) => val.name.toLowerCase().includes(destinationName) && val.destinationGroupId == a.destinations));
      });
      returnValue = new Map(Array.from(returnValue).filter(([key, val]) => val.filteredDestinations.size > 0));
    }
    if (agencyName.length > 0) {
      agencyName = agencyName.toLowerCase();
      returnValue = new Map(Array.from(returnValue).filter(([key, val]) => val.name.toLowerCase().includes(agencyName)));
    }
    return returnValue;
  }
}
