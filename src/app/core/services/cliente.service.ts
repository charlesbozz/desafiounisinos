import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/clientes/pages/models/cliente.models';
import { Firestore } from '../classes/firestore.class';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends Firestore<Cliente> {
  constructor(protected override db: AngularFirestore) {
    super(db, 'clientes');
    this.setCollection('clientes');
  }

  cadastrarCliente(cliente: Cliente): Promise<DocumentReference<Cliente>> {
    if (!this.collection) {
      throw new Error('Collection not initialized');
    }
    return this.collection.add(cliente);
  }

  getClientes(): Observable<Cliente[]> {
    if (!this.collection) {
      throw new Error('Collection not initialized');
    }
    return this.collection.valueChanges({ idField: 'id' });
  }

  getClientePorId(id: string): Observable<Cliente | undefined> {
    if (!this.collection) {
      throw new Error('Collection not initialized');
    }
    return this.collection.doc<Cliente>(id).valueChanges();
  }
  
  excluirCliente(id: string): Promise<void> {
    if (!this.collection) {
      throw new Error('Collection not initialized');
    }
    return this.collection.doc(id).delete();
  }
}