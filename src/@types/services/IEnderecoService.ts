import { Endereco } from "../../models/EnderecoEntity";
import { EnderecoDto } from "../../@types/dto/EnderecoDto";

export interface IEnderecoService {
  buscaPorCep(cep: string): Promise<EnderecoDto>;
  criar(cep: string, numero: string): Promise<Endereco>;
}
