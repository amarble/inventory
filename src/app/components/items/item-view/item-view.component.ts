import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Item } from '../../../models/item';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {

  @Input() item: Item;
  @Output() collapsed = new EventEmitter<boolean> ()

  constructor() { }

  ngOnInit() {
  }

  collapse() {
    this.collapsed.emit(true);
  }

}
