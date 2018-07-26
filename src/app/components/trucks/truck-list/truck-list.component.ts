import { Component, OnInit } from '@angular/core';

import { Truck } from '../../../models/truck';
import { TruckService } from '../../../services/truck';

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css']
})
export class TruckListComponent implements OnInit {

  trucks: Truck[];

  constructor(private truckService: TruckService) { }

  ngOnInit() {
    this.truckService.getAll().subscribe(trucks => this.trucks = trucks);
  }

}
