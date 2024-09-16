import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DetalhesClientePageRoutingModule } from './detalhes-cliente-routing.module';
import { DetalhesClientePage } from './detalhes-cliente.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    DetalhesClientePageRoutingModule
  ],
  declarations: [DetalhesClientePage]
})
export class DetalhesClientePageModule {}
