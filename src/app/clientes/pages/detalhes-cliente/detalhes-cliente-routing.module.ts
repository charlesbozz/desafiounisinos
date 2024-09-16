import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesClientePage } from './detalhes-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesClientePageRoutingModule {}
