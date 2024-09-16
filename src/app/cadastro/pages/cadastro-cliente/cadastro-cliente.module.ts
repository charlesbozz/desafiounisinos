import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module'; 
import { CadastroClientePageRoutingModule } from './cadastro-cliente-routing.module';
import { CadastroClientePage } from './cadastro-cliente.page';

@NgModule({
  imports: [
    
    SharedModule,
    FormsModule,
    CadastroClientePageRoutingModule
    
  ],
  declarations: [CadastroClientePage]
})
export class CadastroClientePageModule {}
