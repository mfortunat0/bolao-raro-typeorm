import { Campeonato } from "../models/CampeonatoEntity";
import { EntityRepository, Repository } from "typeorm";
import { ICampeonatoRepository } from "../@types/repositories/ICampeonatoRepository";

@EntityRepository(Campeonato)
export class CampeonatoRepository
  extends Repository<Campeonato>
  implements ICampeonatoRepository {}
