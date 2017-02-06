import {Component, OnInit} from '@angular/core';

import {Item} from '../../objects/item';
import {ItemService} from '../../services/item.service';

let SockJS = require('sockjs-client');
let Stomp = require('stompjs');

@Component({
  moduleId: module.id,
  selector: 'list-items',
  templateUrl: 'listitems.component.html',
  styleUrls: ['listitems.component.css'],
  providers: [ItemService]
})

export class ListItemsComponent implements OnInit {

  items: Item[] = [];
  errorMessage: string;
  mode = 'Observable';
  stompClient: any;


  constructor(private itemService: ItemService) {
   this.connect();
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);
  }

  connect (): void {
    let that = this;
    let socket = new SockJS('http://localhost:9100/websocket');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, function(frame) {
      //console.log('Connected: ' + frame);
      that.stompClient.subscribe('/queue/event', function(notification) {
        //console.log("from ", notification.body);
        //received an Item as JSON in "content"
        that.event(JSON.parse(JSON.parse(notification.body).content));
      });
    }, function (err) {
      console.log('err', err);
    });
  }

  event (item:Item) {
    //console.log("EVENT item="+item);
    //update table, set new value
    for (let i = 0; i < this.items.length; i++) {
      if(this.items[i].uid == item.uid) {
        this.items[i].value = item.value;
        break;
      }
    }
  }

}
