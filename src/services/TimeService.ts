import { Inject, Service } from "typedi";
import { ITimeService } from "../@types/services/ITimeService";
import { Partida } from "../models/PartidaEntity";
import { Time } from "../models/TimeEntity";
import { IPartidaRepository } from "../@types/repositories/IPartidaRepository";
import { FiltrosPartidas } from "../@types/models/time";
import { Campeonato } from "../models/CampeonatoEntity";

@Service("TimeService")
export class TimeService implements ITimeService {
  constructor(
    @Inject("PartidaRepository") private partidaRepository: IPartidaRepository
  ) {}

  getPartidasVisitante(
    timeId: number,
    filtros: FiltrosPartidas
  ): Promise<Partida[]> {
    const time = this.getTime(timeId);
    const campeonato = this.getCampeonato(filtros.campeonatoId);
    return this.partidaRepository.getPartidaDoVisitante(time, campeonato);
  }

  getPartidasMandante(
    timeId: number,
    filtros: FiltrosPartidas
  ): Promise<Partida[]> {
    const time = this.getTime(timeId);
    const campeonato = this.getCampeonato(filtros.campeonatoId);
    return this.partidaRepository.getPartidaDoMandante(time, campeonato);
  }

  getTodasPartidas(
    timeId: number,
    filtros: FiltrosPartidas
  ): Promise<Partida[]> {
    const time = this.getTime(timeId);
    const campeonato = this.getCampeonato(filtros.campeonatoId);
    return this.partidaRepository.getPartidaDoTime(time, campeonato);
  }

  private getTime(timeId: number): Time {
    const time = new Time();
    time.id = timeId;
    return time;
  }

  private getCampeonato(campeonatoId: number): Campeonato {
    const campeonato = new Campeonato();
    campeonato.id = campeonatoId;
    return campeonato;
  }
}
