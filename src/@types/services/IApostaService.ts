import { CreateApostaDto } from "../../@types/dto/CreateApostaDto";
import { Aposta } from "../../models/ApostaEntity";

export interface IApostaService {
  listar(user_id: number): Promise<Aposta[]>;
  buscar(user_id: number, aposta_id: number): Promise<Aposta>;
  criar(user_id: number, apostaDto: CreateApostaDto): Promise<Aposta>;
  atualizar(id: number, apostaDto: CreateApostaDto): Promise<void>;
}
