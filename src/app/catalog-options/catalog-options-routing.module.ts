import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogOptionsPage } from './catalog-options.page';

const routes: Routes = [
  {
    path: '',
    component: CatalogOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogOptionsPageRoutingModule {}
