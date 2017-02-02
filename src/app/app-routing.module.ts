import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListItemsComponent }   from './listitems/listitems.component';

const routes: Routes = [
  { path: '', redirectTo: '/listitems', pathMatch: 'full' },
  { path: 'listitems',  component: ListItemsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
