import { ICampeonatoRepository } from "../@types/repositories/ICampeonatoRepository";
import { Inject, Service } from "typedi";
import { ICampeonatoService } from "../@types/services/ICampeonatoService";
import { CreateCampeonatoDto } from "../@types/dto/CreateCampeonatoDto";
import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { IBrasileiraoClient } from "../@types/clients/IBrasileiraoClient";
import { IRodadaService } from "../@types/services/IRodadaService";
import { Campeonato } from "../models/CampeonatoEntity";
import { Rodada } from "../models/RodadaEntity";

@Service("CampeonatoService")
export class CampeonatoService implements ICampeonatoService {
  constructor(
    @Inject("CampeonatoRepository")
    private campeonatoRepository: ICampeonatoRepository,
    @Inject("UsuarioRepository")
    private usuarioRepository: IUsuarioRepository,
    @Inject("BrasileiraoClient") private brasileiraoClient: IBrasileiraoClient,
    @Inject("RodadaService") private rodadaService: IRodadaService
  ) {}

  async buscar(id: number) {
    return await this.campeonatoRepository.findOne(id, {
      relations: ["usuarios", "rodadas", "rodadas.partidas"],
    });
  }

  async criar(
    user_id: number,
    {
      nome,
      nomePopular,
      logo,
      slug,
      idCampeonatoApiExterna,
    }: CreateCampeonatoDto
  ) {
    const usuario = await this.usuarioRepository.findOne(user_id);
    const campeonatoExistente = await this.campeonatoRepository.findOne({
      where: { nome },
    });

    let campeonato = campeonatoExistente
      ? campeonatoExistente
      : new Campeonato();

    Object.assign(campeonato, {
      nome,
      nomePopular,
      logo,
      slug,
      status: true,
      idCampeonatoApiExterna,
      usuarios: [],
      rodadas: [],
    });

    campeonato = await this.campeonatoRepository.save(campeonato);

    const rodadas: Rodada[] = [];
    for (let c = 1; c < 39; c++) {
      const rodadaResponse =
        await this.brasileiraoClient.getRodadaByNumeroRodada(
          idCampeonatoApiExterna,
          c
        );
      const rodada = await this.rodadaService.criar(
        campeonato.id,
        rodadaResponse
      );
      rodadas.push(rodada);
    }
    Object.assign(campeonato, {
      ...campeonato,
      usuarios: [usuario],
      rodadas: rodadas,
    });
    return await this.campeonatoRepository.save(campeonato);
  }

  async remover(id: number) {
    const campeonatoToDisable = await this.campeonatoRepository.findOne(id);
    campeonatoToDisable.status = false;
    if (!campeonatoToDisable) {
      throw new Error("Campeonato not found!");
    }
    await this.campeonatoRepository.save(campeonatoToDisable);
  }
}
