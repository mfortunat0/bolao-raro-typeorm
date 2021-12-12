import { Inject, Service } from "typedi";
import { IEnderecoService } from "../@types/services/IEnderecoService";
import { EnderecoDto } from "../@types/dto/EnderecoDto";
import { ICepClient } from "../@types/clients/ICepClient";
import { IEnderecoRepository } from "../@types/repositories/IEnderecoRepository";
import { Endereco } from "../models/EnderecoEntity";
import { CreateEnderecoDto } from "../@types/dto/CreateEnderecoDto";

@Service("EnderecoService")
export class EnderecoService implements IEnderecoService {
  constructor(
    @Inject("CepClient") private cepClient: ICepClient,
    @Inject("EnderecoRepository")
    private enderecoRepository: IEnderecoRepository
  ) {}

  buscaPorCep(cep: string): Promise<EnderecoDto> {
    return this.cepClient.buscaEnderecoPorCEP(cep);
  }

  async criar(cep: string, numero: string): Promise<Endereco> {
    const { logradouro, complemento, bairro, uf } = await this.buscaPorCep(cep);
    const endereco: CreateEnderecoDto = {
      cep,
      logradouro,
      complemento,
      numero,
      bairro,
      estado: uf,
    };
    return this.enderecoRepository.save(endereco);
  }
}
