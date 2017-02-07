import {Item} from '../objects/item';

import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ItemService {

  private itemsUrl = 'http://localhost:9100/init';  // URL to web api

  constructor(private http: Http) {
  }


  getItems(): Observable<Item[]> {

    return this.http.get(this.itemsUrl)
      .map(response => <Item[]>response.json())
      .do((data => console.log('parsed')))
      .catch(this.handleError);
  }

  putValue(item: Item): Observable<void> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = 'http://localhost:9100/cmd';

    console.log('putValue json=' + JSON.stringify(item));

    return this.http
      .post(url, JSON.stringify(item), {headers: headers})
      // .map(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {

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

