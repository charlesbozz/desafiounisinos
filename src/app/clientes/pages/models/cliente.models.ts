export interface Cliente{
    id?: string;
    nome: string;
    dataNascimento: string;
    cpf: string;
    telefone: string;
    email: string;
    endereco: string;
    observacoes?: string;
  }