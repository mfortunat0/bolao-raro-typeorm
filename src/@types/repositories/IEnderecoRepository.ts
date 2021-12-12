import { CreateEnderecoDto } from "../../@types/dto/CreateEnderecoDto";
import { Endereco } from "../../models/EnderecoEntity";

export interface IEnderecoRepository {
  save(createEnderecoDto: CreateEnderecoDto): Promise<Endereco>;
}
