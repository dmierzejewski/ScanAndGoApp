import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogOptionsPageRoutingModule } from './catalog-options-routing.module';

import { CatalogOptionsPage } from './catalog-options.page';
import { DoorsComponent } from '../doors/doors.component';
import { WindowsComponent } from '../windows/windows.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogOptionsPageRoutingModule,
   
  ],
  declarations: [CatalogOptionsPage, DoorsComponent, WindowsComponent]
})
export class CatalogOptionsPageModule {}
