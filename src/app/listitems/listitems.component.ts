import { Component, OnInit } from '@angular/core';
//import { Router }            from '@angular/router';

import { Item } from '../items/item';
import { ItemService } from '../items/item.service';

@Component({
  moduleId: module.id,
  selector: 'list-items',
  templateUrl: 'listitems.component.html',
  styleUrls: [ 'listitems.component.css' ],
  providers: [ItemService]
})

export class ListItemsComponent implements OnInit {

  items: Item[] = [];
  errorMessage: string;
  mode = 'Observable';

  constructor(
    private itemService: ItemService) { }
  ngOnInit() {
    this.getItems();
  }

  getItems() : void {

    this.itemService.getItems()
      .subscribe(
        items => this.items = items,
        error =>  this.errorMessage = <any>error);
  }


}
