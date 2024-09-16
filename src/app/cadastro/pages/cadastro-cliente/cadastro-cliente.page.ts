import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/clientes/pages/models/cliente.models';
import { ClienteService } from 'src/app/core/services/cliente.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
})
export class CadastroClientePage implements OnInit {
  clienteForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {this.initForm();}

  ionViewWillEnter(){
    this.resetForm();
  }

  private initForm(): void {
    this.clienteForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), this.cpfValidator]],
      telefone: ['', [Validators.required, Validators.pattern(/^(\d{10,11})$/)]],
      email: ['', [Validators.required, Validators.email]],
      endereco: [''],
      observacoes: ['']
    });
  }

  private resetForm(): void{
    if (this.clienteForm) {
      this.clienteForm.reset({
        nome: '',
        dataNascimento: '',
        cpf: '',
        telefone: '',
        email: '',
        endereco: '',
        observacoes: ''
      });
    }
  }

  async onSubmit() {
    if (this.clienteForm.valid) {
      const cliente: Cliente = this.clienteForm.value;
      try {
        await this.clienteService.cadastrarCliente(cliente);
        await this.presentToast('Cliente cadastrado com sucesso!', 'success');
        this.router.navigate(['/lista-clientes']);
      } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        await this.presentToast('Erro ao cadastrar cliente. Tente novamente.', 'danger');
      }
    } else {
      this.markFormGroupTouched(this.clienteForm);
      await this.presentToast('Por favor, preencha todos os campos obrigatórios corretamente.', 'warning');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  private cpfValidator(control: AbstractControl): {[key: string]: any} | null {
    const cpf = control.value;
    if (cpf && cpf.length !== 11) {
      return { 'cpfInvalido': true };
    }
    
    return null;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Getters para facilitar o acesso aos campos do formulário no template
  get nome() { return this.clienteForm.get('nome'); }
  get dataNascimento() { return this.clienteForm.get('dataNascimento'); }
  get cpf() { return this.clienteForm.get('cpf'); }
  get telefone() { return this.clienteForm.get('telefone'); }
  get email() { return this.clienteForm.get('email'); }

  // Métodos auxiliares para verificação de erros no template
  hasError(controlName: string, errorName: string): boolean {
    const control = this.clienteForm.get(controlName);
    return !!control?.hasError(errorName) && control.touched;
  }
}