import { Item } from './item';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';





@Injectable()
export class ItemService {

  private itemsUrl = 'http://localhost:9100/init';  // URL to web api

  constructor(private http: Http) { }


  getItems(): Observable<Item[]> {
  console.log('ItemService getItems - before http.get() call');

  return this.http.get(this.itemsUrl)
  //.map(this.extractData)
    .map(response => <Item[]>response.json())
    .do((data => console.log('parsed')))
    .catch(this.handleError);

  //console.log('ItemService getItems - after http.get() call');
}
/*
  getItems(): Observable {
    console.log('ItemService getItems - before http.get() call');

    return this.http.get(this.itemsUrl)
    //.map(this.extractData)
      //.map((response: Response) => <Item[]> response.json())
      //.do((response: Response) => console.log('parsed'))
      .catch(this.handleError);

    //console.log('ItemService getItems - after http.get() call');
  }

  getItems(): Item[] {
    console.log('ItemService getItems - before http.get() call');

    return this.http.get(this.itemsUrl)
      //.toPromise()
      .then(response => response.json().data as Item[])
      .catch(this.handleError);

    //console.log('ItemService getItems - after http.get() call');
  }
*/

  /*
  getItems() : Observable<Item[]> {
    return this.http.get('http://localhost:9100/init').map(this.extractData).catch(this.handleError);

  }*/

  private extractData(res: Response) {

    console.log('get data response');
    let body = res.json();
    console.log('after let');
    console.log(JSON.stringify(body));
    //return this.items;
    return body.data || { };
  }
/*
  getItemsMock(): Promise<Item[]> {
    return Promise.resolve(ITEMS);
  }


/*
  getItemsSlowly(): Promise<Item[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getItems()), 2000);
    });
  }

  getItem(uid: string): Promise<Item> {
    return this.getItems()
      .then(items => items.find(item => item.uid === uid));
  }
  */

  private handleError (error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);


  }
}

