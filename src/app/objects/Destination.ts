export class Destination {
  name: string;
  description: string;
  //photos: slika[];
  type: string; // Letovanje, zimovanje, gradovi Evrope
  transport: string; // avion, autobus, sopstveni prevoz
  price: number;
  capacity: number; // max broj osoba
  id: number; // TODO: promeni na firebase ID

  constructor(destination: any) {
    this.name = destination.name;
    this.description = destination.description;
    this.type = destination.type;
    this.transport = destination.transport;
    this.price = destination.price;
    this.capacity = destination.capacity;
    this.id = new Date().getTime();
  }
}
