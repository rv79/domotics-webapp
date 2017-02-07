import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule }     from '@angular/http';

import { AppComponent }         from './app.component';
import { ListItemsComponent }   from './components/listitems/listitems.component';
import { ItemService }          from './services/item.service';

import { AppRoutingModule }     from './app-routing.module';
import {TextComponent} from "./components/testbinding/text.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    AppComponent,
    ListItemsComponent,
    TextComponent,
  ],
  providers: [ ItemService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
