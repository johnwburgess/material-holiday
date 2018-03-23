import {OnInit } from '@angular/core';

import {ChangeDetectionStrategy, Component, Host} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import {MatCalendar} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

import {Location} from '../service/location';
import {LocationRequest, Direction} from '../service/locationrequest';
import {LocationResponse} from '../service/locationresponse';
import {LocationHttpClient} from '../service/locationhttpclient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocationHttpClient]
})
export class AppComponent  implements OnInit {
  title = 'app';

  ngOnInit() {
    // ...
  }

  constructor(private locationHttpClient: LocationHttpClient) {
  }

// Route Selection support
  isReturnRequired: boolean = false;

  origin:string;
  origins: Location[] = [
    {code: 'LHR', name: 'London Heathrow'},
    {code: 'LGW', name: 'London Gatwick'},
    {code: 'LUT', name: 'London Luton'}
  ];
  filteredOrigins = this.origins;

  destination:string;
  destinations: Location[] = [
    {code: 'JFK', name: 'New York John F. Kennedy'},
    {code: 'EWR', name: 'New York Newark'},
    {code: 'LGA', name: 'New York LaGuardia'}
  ];
  filteredDestinations = this.destinations;

// TODO implement backend in order to support filtering of origin and destination
  filterOrigins(origin:string, destination: string) {
/*
    this.locationHttpClient.getLocations(new LocationRequest(Direction.Outbound, origin, destination)).subscribe((result: LocationResponse) => {
      this.origins = result.locations;
      this.filterLocations(this.origins, origin);
    });
*/
    this.filterLocations(this.origins, origin);
  }

  filterDestinations(origin:string, destination: string) {
/*
    this.locationHttpClient.getLocations(new LocationRequest(Direction.Inbound, origin, destination)).subscribe((result: LocationResponse) => {
      this.destinations = result.locations;
      this.filterLocations(this.destinations, destination);
    });
*/
    this.filterLocations(this.destinations, destination);
   }

  filterLocations(locations: Location[], val: string) {
    return val ? this._filter(locations, val) : locations;
  }

  private _filter(locations: Location[], val: string) {
    const filterValue = val.toLowerCase();
    return locations.filter(location => location.name.toLowerCase().indexOf(filterValue) >= 0);
  }

// Date Range selection support

  startDate: Date;
  returnDate: Date;

  public get returnDatepickerDisabled() {
    return !this.isReturnRequired;
  }

  public get returnDateMinDate() {
    let today = new Date();
    return this.startDate ? this.startDate : today;
  }

  public get startDateMinDate() {
    return new Date();
  }

  public get startDateMaxDate() {
    return this.returnDate && this.isReturnRequired ? this.returnDate : null;
  }

// TODO prevent setting invalid data - spinner is restricted to 1-5 but text control needs disabling or change handliing
  numberOfAdults: number = 1;

// TODO add button to reset all selcted values

  public resetForm() {
    this.isReturnRequired = false;
    this.startDate = null;
    this.returnDate = null;

    this.origin = null;
    this.destination = null;

    this.numberOfAdults = 1;
  }

}
