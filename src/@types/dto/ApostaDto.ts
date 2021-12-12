import { Partida } from "../../models/PartidaEntity";
import { Usuario } from "../../models/UsuarioEntity";

export interface ApostaDto {
  usuario: Usuario;
  placarMandate: number;
  placarVisitante: number;
  partida: Partida;
}
