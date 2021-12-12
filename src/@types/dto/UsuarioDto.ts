import { Endereco } from "models/EnderecoEntity";

export interface UsuarioDto {
  id?: number;
  nome: string;
  email: string;
  hashSenha: string;
  endereco: Endereco;
}
