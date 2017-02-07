import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListItemsComponent }   from './components/listitems/listitems.component';
import {TextComponent} from "./components/testbinding/text.component";

const routes: Routes = [
  { path: '', redirectTo: '/listitems', pathMatch: 'full' },
  { path: 'listitems',  component: ListItemsComponent },
  { path: 'test',  component: TextComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
