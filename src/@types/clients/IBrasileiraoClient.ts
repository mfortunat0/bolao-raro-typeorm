import { Rodada } from "../../@types/dto/api-brasileirao/Rodada";

export interface IBrasileiraoClient {
  // getTabela: (campeonato: number) => Promise<AxiosResponse<TabelaDto[]>>;
  getRodadas: (campeonato: number) => Promise<Rodada[]>;
  getRodadaByNumeroRodada: (
    campeonato: number,
    numeroRodada: number
  ) => Promise<Rodada>;
}
