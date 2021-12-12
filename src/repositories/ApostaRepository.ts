import { Aposta } from "../models/ApostaEntity";
import { EntityRepository, Repository } from "typeorm";
import { IApostaRepository } from "../@types/repositories/IApostaRepository";

@EntityRepository(Aposta)
export class ApostaRepository
  extends Repository<Aposta>
  implements IApostaRepository {}
