import { StatusAndamento } from "../../enums/StatusAndamento";
import { Partida } from "./Partida";

export interface Rodada {
  nome: string;
  slug: string;
  rodada: number;
  status: StatusAndamento;
  partidas?: Partida[];
}

export type Rodadas = Omit<Rodada, "partidas">[];
