import { Endereco } from "../models/EnderecoEntity";
import { EntityRepository, Repository } from "typeorm";
import { IEnderecoRepository } from "../@types/repositories/IEnderecoRepository";

@EntityRepository(Endereco)
export class EnderecoRepository
  extends Repository<Endereco>
  implements IEnderecoRepository {}
