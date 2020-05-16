import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTodosPage } from './new-todos.page';

const routes: Routes = [
  {
    path: '',
    component: NewTodosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTodosPageRoutingModule {}
