import { IApostaRepository } from "../@types/repositories/IApostaRepository";
import { Inject, Service } from "typedi";
import { IApostaService } from "../@types/services/IApostaService";
import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { Aposta } from "../models/ApostaEntity";
import { IPartidaRepository } from "../@types/repositories/IPartidaRepository";
import { CreateApostaDto } from "../@types/dto/CreateApostaDto";
import { Partida } from "../models/PartidaEntity";
import { StatusAndamento } from "../@types/enums/StatusAndamento";

@Service("ApostaService")
export class ApostaService implements IApostaService {
  constructor(
    @Inject("ApostaRepository") private apostaRepository: IApostaRepository,
    @Inject("UsuarioRepository") private usuarioRepository: IUsuarioRepository,
    @Inject("PartidaRepository") private partidaRepository: IPartidaRepository
  ) {}

  async listar(user_id: number) {
    return this.apostaRepository.find({
      relations: ["usuario", "partida", "partida.rodada"],
      where: {
        usuario: {
          id: user_id,
        },
      },
    });
  }

  async buscar(user_id: number, aposta_id: number) {
    return this.apostaRepository.findOne(aposta_id, {
      relations: ["usuario", "partida", "partida.rodada"],
      where: {
        usuario: {
          id: user_id,
        },
      },
    });
  }

  async criar(
    user_id: number,
    { placarMandate, placarVisitante, partida_id }: CreateApostaDto
  ) {
    const apostaExistente = await this.apostaRepository.findOne({
      where: { partida: { id: partida_id }, usuario: { id: user_id } },
    });

    if (apostaExistente) {
      throw new Error(`Aposta already exists for partida ${partida_id}`);
    }

    const usuario = await this.usuarioRepository.findOne(user_id);
    const partida = await this.partidaRepository.findOne(partida_id, {
      relations: ["rodada", "rodada.partidas"],
    });

    if (partida.rodada.status === "encerrada") {
      throw new Error("Rodada already over");
    }

    const { partidas } = partida.rodada;

    this.checkDataApostaIsValide(partidas);

    const aposta = new Aposta();
    Object.assign(aposta, {
      placarMandate,
      placarVisitante,
      usuario,
      partida,
    });
    return this.apostaRepository.save(aposta);
  }

  async atualizar(
    id: number,
    { placarMandate, placarVisitante }: CreateApostaDto
  ) {
    const apostaToUpdate = this.apostaRepository.findOne(id);
    if (!apostaToUpdate) {
      throw new Error("Aposta not found!");
    }
    const aposta = new Aposta();
    Object.assign(aposta, {
      ...apostaToUpdate,
      placarMandate,
      placarVisitante,
    });
    await this.apostaRepository.save(aposta);
  }

  checkDataApostaIsValide(partidas: Partida[]) {
    partidas.forEach((partida) => {
      if (partida.status !== StatusAndamento.Agendada) {
        throw new Error("Rodada already has a partida in progress");
      }
    });
  }
}
