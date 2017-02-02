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

  //private itemService : ItemService;

  constructor(
    private itemService: ItemService) { }

  /*
  errorMessage: string;
  mode = 'Observable';*/

  //constructor(private itemService: ItemService) { }

  ngOnInit() {
    console.log('ItemComp onInit - before getItems()');
    this.getItems();
    /*
    this.itemService.getItems()
      .then(items => this.items = items);*/
    console.log('ItemComp onInit - after getItems()');
  }

  getItems() : void {
    console.log('ItemComp getItems - before getItems() call');
    this.itemService.getItems()
      .subscribe(
        items => this.items = items,
        error =>  this.errorMessage = <any>error);
    //console.log(items);
    /*
    this.itemService
      .getItems()
      .then(items => this.items = items);*/
    console.log('ItemComp getItems - before getItems() call');
    /*
    this.itemService.getItems()
      .subscribe(
        items => this.items = items,
        error =>  this.errorMessage = <any>error);
    console.log('back to component');*/
  }


}
