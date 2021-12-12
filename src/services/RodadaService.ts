import { Inject, Service } from "typedi";
import { IRodadaService } from "../@types/services/IRodadaService";
import { IRodadaRepository } from "../@types/repositories/IRodadaRepository";
import { Rodada } from "../models/RodadaEntity";
import { Campeonato } from "../models/CampeonatoEntity";
import { Partida } from "../models/PartidaEntity";
import { Time } from "../models/TimeEntity";
import { Rodada as RodadaDTO } from "../@types/dto/api-brasileirao/Rodada";
import { Partida as PartidaDTO } from "../@types/dto/api-brasileirao/Partida";
import { Time as TimeDTO } from "../@types/dto/api-brasileirao/Time";

@Service("RodadaService")
export class RodadaService implements IRodadaService {
  constructor(
    @Inject("RodadaRepository") private RodadaRepository: IRodadaRepository
  ) {}
  listar(): Promise<Rodada[]> {
    throw new Error("Method not implemented.");
  }

  async criar(campeonatoId: number, rodadaDto: RodadaDTO): Promise<Rodada> {
    const rodada = this.rodadaFactory(campeonatoId, rodadaDto);
    const rodadaCriada = await this.RodadaRepository.saveOrUpdate(rodada);
    return rodadaCriada;
  }

  private rodadaFactory(campeonatoId: number, rodadaDto: RodadaDTO): Rodada {
    const campeonato = new Campeonato();
    campeonato.id = campeonatoId;
    const rodada = new Rodada();
    rodada.nome = rodadaDto.nome;
    rodada.slug = rodadaDto.slug;
    rodada.rodada = rodadaDto.rodada;
    rodada.status = rodadaDto.status;
    rodada.campeonato = campeonato;
    rodada.partidas = rodadaDto.partidas.map((partidaDto) =>
      this.partidaFactory(partidaDto)
    );
    return rodada;
  }

  private partidaFactory(partidaDto: PartidaDTO): Partida {
    const partida = new Partida();
    partida.id = partidaDto.partida_id;
    partida.placar = partidaDto.placar;
    partida.placarMandante = partidaDto.placar_mandante;
    partida.placarVisitante = partidaDto.placar_visitante;
    partida.status = partidaDto.status;
    partida.slug = partidaDto.slug;
    partida.dataRealização = partidaDto.data_realizacao_iso
      ? new Date(partidaDto.data_realizacao_iso)
      : null;
    partida.visitante = this.timeFactory(partidaDto.time_visitante);
    partida.mandante = this.timeFactory(partidaDto.time_mandante);
    return partida;
  }

  private timeFactory(timeDto: TimeDTO): Time {
    const time = new Time();
    time.id = timeDto.time_id;
    time.nome = timeDto.nome_popular;
    time.sigla = timeDto.sigla;
    time.escudo = timeDto.escudo;

    return time;
  }
}
