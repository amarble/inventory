import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Item } from '../../../models/item';

@Component({
  selector: 'app-item-thumbnail',
  templateUrl: './item-thumbnail.component.html',
  styleUrls: ['./item-thumbnail.component.css']
})
export class ItemThumbnailComponent implements OnInit {

  showButton = false;

  @HostBinding('class.expanded') expanded = false;
  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

  expand() {
    this.expanded = true;
  }

  collapse() {
    this.expanded = false;
    this.showButton = false;
  }

}
