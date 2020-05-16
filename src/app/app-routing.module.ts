import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthSearchProductsGuard } from './services/auth-search-products.guard';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'folder/Inbox',
    // redirectTo: 'authentication',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'new-todos',
    loadChildren: () => import('./new-todos/new-todos.module').then( m => m.NewTodosPageModule)
  },
  //{
  //  path: 'catalog',
    //loadChildren: () => import('./catalog/catalog.module').then( m => m.CatalogPageModule)
  //},
  {
    path: 'catalog-options',
    loadChildren: () => import('./catalog-options/catalog-options.module').then( m => m.CatalogOptionsPageModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then( m => m.AuthenticationPageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./scan/scan.module').then( m => m.ScanPageModule),
    canActivate: [AuthGuardService],
    //ahahah
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule),
    canActivate: [AuthSearchProductsGuard]
  },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'bills',
    loadChildren: () => import('./bills/bills.module').then( m => m.BillsPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then( m => m.ShoppingListPageModule),
    // canActivate: [AuthGuardService],
  },
  {
    path: 'my',
    loadChildren: () => import('./my/my.module').then( m => m.MyPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
 /*
 {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerModule)
  }
 */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
