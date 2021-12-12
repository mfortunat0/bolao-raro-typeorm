import { Rodada } from "../../models/RodadaEntity";
import { Usuario } from "../../models/UsuarioEntity";

export interface CreateCampeonatoDto {
  nome: string;
  slug: string;
  nomePopular: string;
  logo: string;
  idCampeonatoApiExterna: number;
  rodadas: Rodada[];
  usuarios: Usuario[];
}
