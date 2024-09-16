import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from '../models/cliente.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.page.html',
  styleUrls: ['./lista-clientes.page.scss'],
})
export class ListaClientesPage implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {} 

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
      },
      error: (error) => {
        console.error('Erro ao obter clientes:', error);
      }
    });
  }

  verDetalhes(clienteId: string | undefined) {
    if (clienteId) {
      this.router.navigate(['/detalhes-cliente', clienteId]);
    } else {
      console.error('ID do cliente não definido');
    }
  }

  adicionarNovoCliente() {
    this.router.navigate(['/cadastro-cliente']);
  }
}