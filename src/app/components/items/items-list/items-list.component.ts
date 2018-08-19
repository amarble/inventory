import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { NewItemComponent } from '../../../dialogs';
import { ItemService } from '../../../services/item';
import { Item } from '../../../models/item';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  items: Item[];

  constructor(
    private dialog: MatDialog,
    private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getAll().subscribe(items => this.items = items);
  }

  addItem() {
    const dialogRef = this.dialog.open(NewItemComponent);
  }

}
