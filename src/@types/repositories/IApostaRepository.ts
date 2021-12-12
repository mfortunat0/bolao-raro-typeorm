import { Aposta } from "../../models/ApostaEntity";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { ApostaDto } from "../../@types/dto/ApostaDto";

export interface IApostaRepository {
  find(options?: FindManyOptions<Aposta>): Promise<Aposta[]>;
  findOne(
    id?: number,
    options?: FindOneOptions<Aposta>
  ): Promise<Aposta | undefined>;
  findOne(options?: FindOneOptions<Aposta>): Promise<Aposta | undefined>;
  save(apostaDto: ApostaDto): Promise<Aposta>;
  remove(entities: Aposta | Aposta[]): Promise<Aposta[]>;
}
