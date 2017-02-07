import { Component } from '@angular/core';

@Component({
  selector: 'domotics',
  template: `
   <h1>{{title}}</h1>
   <nav>
     [<a routerLink="/listitems">List Items</a>]
     [<a routerLink="/test">Test</a>]
   </nav>
   <router-outlet></router-outlet>
   `
})

export class AppComponent {
  title = 'Domotics';
}
