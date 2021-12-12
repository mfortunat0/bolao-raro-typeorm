import { StatusAndamento } from "../../enums/StatusAndamento";
import { Time } from "./Time";

export interface Partida {
  partida_id: number;
  placar: string;
  time_mandante: Time;
  time_visitante: Time;
  placar_mandante: number | null;
  placar_visitante: number | null;
  status: StatusAndamento;
  slug: string;
  data_realizacao: string | null;
  hora_realizacao: string | null;
  data_realizacao_iso: string | null;
}
