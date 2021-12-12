import { Partida } from "../../models/PartidaEntity";
import { Time } from "../../models/TimeEntity";
import { Campeonato } from "../../models/CampeonatoEntity";
import { FindOneOptions } from "typeorm";

export interface IPartidaRepository {
  findOne(
    id?: number,
    options?: FindOneOptions<Partida>
  ): Promise<Partida | undefined>;
  getPartidaDoMandante(time: Time, campeonato?: Campeonato): Promise<Partida[]>;
  getPartidaDoVisitante(
    time: Time,
    campeonato?: Campeonato
  ): Promise<Partida[]>;
  getPartidaDoTime(time: Time, campeonato?: Campeonato): Promise<Partida[]>;
}
