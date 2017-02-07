import {Component, OnInit} from '@angular/core';

import {Item} from '../../objects/item';
import {ItemService} from '../../services/item.service';
import {Headers, Http} from "@angular/http";

let SockJS = require('sockjs-client');
let Stomp = require('stompjs');

//require('nes/client');

@Component({
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
    //this.connect();
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);
  }

  connect(): void {

    let that = this;
    let socket = new SockJS('http://localhost:9100/websocket');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, function (frame) {
      //console.log('Connected: ' + frame);
      that.stompClient.subscribe('/queue/event', function (notification) {
        //console.log("from ", notification.body);
        //received an Item as JSON in "content"
        that.event(JSON.parse(JSON.parse(notification.body).content));
      });
    }, function (err) {
      console.log('err', err);
    });

    /* Using nes to connect to nodeJS
     let Nes = require('nes');
     let client = new Nes.Client('ws://localhost:9101');
     let that = this;

     client.connect({}, function (err) {
     let handler = function (err, update) {
     console.log('update:'+JSON.stringify(update));
     console.log('err:'+JSON.stringify(err));
     that.event(err);
     // First publish is not received (filtered due to updater key)
     // update -> { id: 6, status: 'initial', updater: 'steve' }
     };
     client.subscribe('/events', handler, function (err) { });
     });
     */
  }

  event(item: Item) {
    //console.log("EVENT item="+item);
    //update table, set new value

    this.items[this.getIndex(item.uid)].value = item.value;
  }

  private getIndex(uid:string) : number {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].uid == uid) {
       return i;
      }
    }
  }

  setOnOff(uid : string, element: HTMLInputElement) : void {
    console.log(`Checkbox ${element.value} was ${element.checked ? '' : 'un'}checked\n`);
    console.log('uid='+uid);

    let itemLocal = new Item();

    itemLocal.uid = this.items[this.getIndex(uid)].uid;

    console.log('setOnOff json='+JSON.stringify(itemLocal));

    if (element.checked) {
      itemLocal.value=100;
      this.itemService.putValue(itemLocal)
        .subscribe(null ,
        error => this.errorMessage = <any>error);
    } else {
      itemLocal.value=0;
      this.itemService.putValue(itemLocal)
        .subscribe(null,
        error => this.errorMessage = <any>error);
    }
  }

  setValue(uid : string, element: HTMLInputElement) : void {
    console.log('uid=' + uid + ' value='+element.value);

    let itemLocal = new Item();

    itemLocal.uid = this.items[this.getIndex(uid)].uid;

    console.log('setValue json=' + JSON.stringify(itemLocal));
    itemLocal.value = Number(element.value);

    if (itemLocal.value < 0) {itemLocal.value = 0;}
    if (itemLocal.value > 100) {itemLocal.value = 100;}

    this.itemService.putValue(itemLocal)
      .subscribe(null,
        error => this.errorMessage = <any>error);
  }
}
