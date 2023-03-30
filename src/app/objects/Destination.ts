export class Destination {
  name: string;
  description: string;
  images: string[];
  type: string; // Letovanje, zimovanje, gradovi Evrope
  transport: string; // avion, autobus, sopstveni prevoz
  price: number;
  capacity: number; // max broj osoba
  id: string;
  destinationGroupId: string;

  constructor(destination: any) {
    this.name = destination.name;
    this.description = destination.description;
    this.images = destination.images;
    this.type = destination.type;
    this.transport = destination.transport;
    this.price = destination.price;
    this.capacity = destination.capacity;
    this.id = destination.id;
    this.destinationGroupId = destination.destinationGroupId;
  }
}
