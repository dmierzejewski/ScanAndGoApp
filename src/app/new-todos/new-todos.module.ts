import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTodosPageRoutingModule } from './new-todos-routing.module';

import { NewTodosPage } from './new-todos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTodosPageRoutingModule
  ],
  declarations: [NewTodosPage]
})
export class NewTodosPageModule {}
