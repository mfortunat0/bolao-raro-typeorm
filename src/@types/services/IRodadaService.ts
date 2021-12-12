import { Rodada } from "models/RodadaEntity";
import { Rodada as RodadaDTO } from "../dto/api-brasileirao/Rodada";

export interface IRodadaService {
  listar(): Promise<Rodada[]>;
  criar(campeonatoId: number, rodadaDto: RodadaDTO): Promise<Rodada>;
}
