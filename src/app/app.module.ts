import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ClienteService } from './core/services/cliente.service';






@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule, 
    AppRoutingModule,
  ],
  providers: [
    ClienteService
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
