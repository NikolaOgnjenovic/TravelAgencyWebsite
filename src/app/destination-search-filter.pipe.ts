import { Pipe, PipeTransform } from '@angular/core';
import {Destination} from "./objects/Destination";

@Pipe({
  name: 'destinationSearchFilter'
})
export class DestinationSearchFilterPipe implements PipeTransform {

  transform(destinations: Destination[], destinationName: string, destinationType: string, destinationTransport: string): Destination[] {
    let returnValue = destinations;
    if (destinationName.length > 0) {
      destinationName = destinationName.toLowerCase();
      returnValue = returnValue.filter(d => d.name.toLowerCase().includes(destinationName));
    }
    if (destinationType.length > 0) {
      destinationType = destinationType.toLowerCase();
      returnValue = returnValue.filter(d => d.type.toLowerCase().includes(destinationType));
    }
    if (destinationTransport.length > 0) {
      destinationTransport = destinationTransport.toLowerCase();
      returnValue = returnValue.filter(d => d.transport.toLowerCase().includes(destinationTransport));
    }
    return returnValue;
  }

}
