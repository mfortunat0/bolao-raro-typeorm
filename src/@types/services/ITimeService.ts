import { FiltrosPartidas } from "../../@types/models/time";
import { Partida } from "../../models/PartidaEntity";

export interface ITimeService {
  getPartidasVisitante(
    timeId: number,
    filtros: FiltrosPartidas
  ): Promise<Partida[]>;
  getPartidasMandante(
    timeId: number,
    filtros: FiltrosPartidas
  ): Promise<Partida[]>;
  getTodasPartidas(
    timeId: number,
    filtros: FiltrosPartidas
  ): Promise<Partida[]>;
}
