import { EntityRepository, Repository } from "typeorm";
import { Rodada } from "../models/RodadaEntity";
import { IRodadaRepository } from "../@types/repositories/IRodadaRepository";

@EntityRepository(Rodada)
export class RodadaRepository
  extends Repository<Rodada>
  implements IRodadaRepository
{
  async saveOrUpdate(rodada: Rodada): Promise<Rodada> {
    const rodadaExistente = await this.findOne({
      where: { rodada: rodada.rodada },
    });

    const rodadaToSave = {
      ...rodadaExistente,
      ...rodada,
    };

    return this.save(rodadaToSave);
  }
}
