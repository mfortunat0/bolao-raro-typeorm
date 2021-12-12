import { IPartidaRepository } from "../@types/repositories/IPartidaRepository";
import { Partida } from "../models/PartidaEntity";
import {
  EntityRepository,
  FindConditions,
  FindManyOptions,
  Repository,
} from "typeorm";
import { Time } from "../models/TimeEntity";
import { Campeonato } from "../models/CampeonatoEntity";

@EntityRepository(Partida)
export class PartidaRepository
  extends Repository<Partida>
  implements IPartidaRepository
{
  getPartidaDoMandante(
    time: Time,
    campeonato?: Campeonato
  ): Promise<Partida[]> {
    const { relations, where } = this.getQueryClauses(
      time,
      "mandante",
      campeonato
    );
    return this.find({ relations, where });
  }

  getPartidaDoVisitante(
    time: Time,
    campeonato?: Campeonato
  ): Promise<Partida[]> {
    const { relations, where } = this.getQueryClauses(
      time,
      "visitante",
      campeonato
    );
    return this.find({ relations, where });
  }

  getPartidaDoTime(time: Time, campeonato?: Campeonato): Promise<Partida[]> {
    const { relations, where: whereMandante } = this.getQueryClauses(
      time,
      "mandante",
      campeonato
    );
    const { relations: relationsVisitante, where: whereVisitante } =
      this.getQueryClauses(time, "visitante", campeonato);
    return this.find({
      where: [whereMandante, whereVisitante],
    });
  }

  private getQueryClauses(
    time: Time,
    mandanteOuVisitante: "mandante" | "visitante" = "mandante",
    campeonato?: Campeonato
  ): FindManyOptions<Partida> {
    const relations: string[] = ["visitante", "mandante"];
    const where: FindConditions<Partida> = { [mandanteOuVisitante]: time };

    if (campeonato.id) {
      relations.push("rodada");
      relations.push("rodada.campeonato");
      where.rodada = { campeonato };
    }

    return {
      relations,
      where,
    };
  }
}
