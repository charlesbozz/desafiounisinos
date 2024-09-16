import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/clientes/pages/models/cliente.models';
import { ClienteService } from 'src/app/core/services/cliente.service';

@Component({
  selector: 'app-detalhes-cliente',
  templateUrl: './detalhes-cliente.page.html',
  styleUrls: ['./detalhes-cliente.page.scss'],
})
export class DetalhesClientePage implements OnInit {
  cliente: Cliente | undefined;
  clienteId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.clienteId = this.route.snapshot.paramMap.get('id');
    if (this.clienteId) {
      this.carregarCliente(this.clienteId);      
    } else {
      this.presentToast('ID do cliente não encontrado.', 'danger');
    }

  }

  carregarCliente(id: string) {
    this.clienteService.getClientePorId(id).subscribe(
      (cliente) => {
        if (cliente) {
          this.cliente = {...cliente, id};
        } else {
          this.presentToast('Cliente não encontrado.', 'danger');
        }
      },
      async (error) => {
        console.error('Erro ao carregar cliente:', error);
        await this.presentToast('Erro ao carregar detalhes do cliente.', 'danger');
      }
    );
  }

  async excluirCliente() {
    if (!this.clienteId) {
      await this.presentToast('ID do cliente não está definido.', 'danger');
      return;
    }
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: async () => {
              try {
                await this.clienteService.excluirCliente(this.clienteId!);
                await this.presentToast('Cliente excluído com sucesso!', 'success');
                this.router.navigate(['/lista-clientes']);
              } catch (error) {
                console.error('Erro ao excluir cliente:', error);
                await this.presentToast('Erro ao excluir cliente.', 'danger');
              }
            } 
          }
      ]
    });
    await alert.present();
  }

  /*
  editarCliente() {
    if (this.cliente?.id) {
      this.router.navigate(['/editar-cliente', this.cliente.id]);
    }
  }
  */

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}