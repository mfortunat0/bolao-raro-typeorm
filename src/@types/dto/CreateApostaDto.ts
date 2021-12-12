import { Usuario } from "../../models/UsuarioEntity";

export interface CreateApostaDto {
  usuario: Usuario;
  placarMandate: number;
  placarVisitante: number;
  partida_id: number;
}
