import { Pipe, PipeTransform } from '@angular/core';
import {Destination} from "./objects/Destination";

@Pipe({
  name: 'destinationSearchFilter'
})
export class DestinationSearchFilterPipe implements PipeTransform {

  transform(destinations: Map<string, Destination>, destinationName: string, destinationType: string, destinationTransport: string): Map<string, Destination> {
    let returnValue = destinations;
    if (destinationName.length > 0) {
      destinationName = destinationName.toLowerCase();
      returnValue = new Map(Array.from(returnValue).filter(([key, val]) => val.name.toLowerCase().includes(destinationName)));
    }
    if (destinationType.length > 0) {
      destinationType = destinationType.toLowerCase();
      returnValue = new Map(Array.from(returnValue).filter(([key, val]) => val.type.toLowerCase().includes(destinationType)));
    }
    if (destinationTransport.length > 0) {
      destinationTransport = destinationTransport.toLowerCase();
      returnValue = new Map(Array.from(returnValue).filter(([key, val]) => val.transport.toLowerCase().includes(destinationTransport)));
    }
    return returnValue;
  }

}
