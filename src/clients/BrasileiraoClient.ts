import { IBrasileiraoClient } from "../@types/clients/IBrasileiraoClient";
import { Rodada } from "../@types/dto/api-brasileirao/Rodada";
import { Inject, Service } from "typedi";
import { HttpClient } from "../infra/http/types/HttpClient";

@Service("BrasileiraoClient")
export class BrasileiraoClient implements IBrasileiraoClient {
  private readonly token: string = process.env.TOKEN;
  private readonly baseURL =
    "https://us-central1-small-talk-3972f.cloudfunctions.net/v1/v1/campeonatos/";
  constructor(@Inject("HttpClient") private httpClient: HttpClient) {}

  // async getTabela(campeonato: number): Promise<AxiosResponse<TabelaDto[]>> {
  //   return await brasileiraoApi.get<TabelaDto[]>(`${campeonato}/tabela`, {
  //     headers: {
  //       Authorization: `bearer ${this.token}`,
  //     },
  //   });
  // }

  async getRodadas(campeonato: number) {
    const response = await this.httpClient.get<Rodada[]>(
      `${this.baseURL}${campeonato}/rodadas`,
      {
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      }
    );
    return response.data;
  }

  async getRodadaByNumeroRodada(campeonato: number, numeroRodada: number) {
    const response = await this.httpClient.get<Rodada>(
      `${this.baseURL}${campeonato}/rodadas/${numeroRodada}`,
      {
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      }
    );
    return response.data;
  }
}
