import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListaClientesPageRoutingModule } from './lista-clientes-routing.module';
import { ListaClientesPage } from './lista-clientes.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ListaClientesPageRoutingModule
  ],
  declarations: [ListaClientesPage]
})
export class ListaClientesPageModule {}
