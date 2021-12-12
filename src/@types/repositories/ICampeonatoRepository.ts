import { CreateCampeonatoDto } from "../dto/CreateCampeonatoDto";
import { Campeonato } from "../../models/CampeonatoEntity";
import { FindOneOptions } from "typeorm";

export interface ICampeonatoRepository {
  findOne(
    id?: number,
    options?: FindOneOptions<Campeonato>
  ): Promise<Campeonato | undefined>;
  findOne(
    options?: FindOneOptions<Campeonato>
  ): Promise<Campeonato | undefined>;
  save(userDto: CreateCampeonatoDto): Promise<Campeonato>;
}
