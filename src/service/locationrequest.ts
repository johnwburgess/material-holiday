
export enum Direction {
    Outbound = 1,
    Inbound,
}

export class LocationRequest {

  constructor(
    public direction: Direction,
    public partialOrigin: string,
    public partialDestination: string) {
  }
}
