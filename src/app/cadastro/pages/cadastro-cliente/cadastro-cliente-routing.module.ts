import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroClientePage } from './cadastro-cliente.page';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',       
    component: CadastroClientePage,
    canMatch: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroClientePageRoutingModule  {}
