import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  itemForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });

  purchaseForm = new FormGroup({
    date: new FormControl({value: null}, Validators.required),
    price: new FormControl(0, Validators.min(0.01)),
    notes: new FormControl(''),
    vendor: new FormControl('')
  });

  shipmentForm = new FormGroup({
    date: new FormControl(null, Validators.required),
    method: new FormControl('', Validators.required),
    notes: new FormControl(''),
    tracking: new FormControl('')
  });

  deliveryForm = new FormGroup({
    date: new FormControl('', Validators.required),
    notes: new FormControl('')
  });

  categories = ['Dragon', 'Fairy', 'Fire', 'Flying', 'Water'];
  filteredCategories: Observable<string[]>;

  vendors = ['ABC Shop', 'Americana', 'Shereth'];
  filteredVendors: Observable<string[]>;

  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.filteredCategories = this.itemForm.get('category').valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(this.categories, value))
      );
    this.filteredVendors = this.purchaseForm.get('vendor').valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(this.vendors, value))
      );
  }

  back() {
    this.stepper.previous();
  }

  next() {
    this.stepper.next();
  }

  filter(collection: string[], value: string): string[] {
    value = value.toLowerCase();
    return collection.filter(item => item.toLowerCase().includes(value));
  }

  save() {
    const item = new Item();
    item.name = this.itemForm.get('name').value;
    item.description = this.itemForm.get('description').value;
    item.category = this.itemForm.get('category').value;
    item.purchase = {
      date: this.purchaseForm.get('date').value,
      price: this.purchaseForm.get('price').value,
      notes: this.purchaseForm.get('notes').value,
      vendor: this.purchaseForm.get('vendor').value
    };
    item.shipmentIn = {
      date: this.shipmentForm.get('date').value,
      method: this.shipmentForm.get('method').value,
      notes: this.shipmentForm.get('notes').value,
      tracking: this.shipmentForm.get('tracking').value
    };
    item.delivery = {
      date: this.deliveryForm.get('date').value,
      notes: this.deliveryForm.get('notes').value,
    };

    this.itemService.create(item).subscribe(res => console.log(res));
  }

}
