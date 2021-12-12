import { Campeonato } from "../../models/CampeonatoEntity";
import { CreateCampeonatoDto } from "../dto/CreateCampeonatoDto";

export interface ICampeonatoService {
  buscar(id: number): Promise<Campeonato>;
  criar(
    user_id: number,
    createCampeonatoDto: CreateCampeonatoDto
  ): Promise<Campeonato>;
  remover(id: number): Promise<void>;
}
