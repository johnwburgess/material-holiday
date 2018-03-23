

import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Response } from '@angular/http'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { LocationResponse } from "./locationresponse";
import { LocationRequest, Direction } from "./locationrequest";

@Injectable()

export class LocationHttpClient {

  private baseUrl: string = 'http://localhost:8080/location/';

  constructor(private httpClient: HttpClient) {
  }

  public getLocations(request: LocationRequest): Observable<LocationResponse> {
  let outBound = request.direction === Direction.Outbound;
  let requestUrl = `${this.baseUrl}?outBound=${outBound}&partOrigin=${request.partialOrigin}&partDest=${request.partialDestination}`;
    return this.httpClient
      .get<LocationResponse>(requestUrl);

  }
}
