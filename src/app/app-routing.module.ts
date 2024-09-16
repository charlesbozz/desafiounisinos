import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'cadastro-cliente',
    loadChildren: () => import('./cadastro/pages/cadastro-cliente/cadastro-cliente.module').then( m => m.CadastroClientePageModule), canMatch: [AuthGuard]
  },
  {
    path: 'lista-clientes',
    loadChildren: () => import('./clientes/pages/lista-clientes/lista-clientes.module').then( m => m.ListaClientesPageModule)
  },
  {
    path: 'detalhes-cliente/:id',
    loadChildren: () => import('./clientes/pages/detalhes-cliente/detalhes-cliente.module').then( m => m.DetalhesClientePageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
