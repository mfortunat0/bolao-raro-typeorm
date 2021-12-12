import { FindOneOptions } from "typeorm";
import { Rodada } from "../../models/RodadaEntity";

export interface IRodadaRepository {
  save(rodada: Rodada): Promise<Rodada>;
  saveOrUpdate(rodada: Rodada): Promise<Rodada>;
}
