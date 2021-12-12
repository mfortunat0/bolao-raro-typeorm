import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IRodadaService } from "../@types/services/IRodadaService";
import { Rodada as RodadaDTO } from "../@types/dto/api-brasileirao/Rodada";

type RequestBody = RodadaDTO & { campeonatoId: number };
@Service("RodadaController")
export class RodadaController {
  constructor(@Inject("RodadaService") private RodadaService: IRodadaService) {}

  public async listar(req: Request, res: Response) {
    const rodadas = await this.RodadaService.listar();
    return res.json(rodadas);
  }

  public async criar(req: Request, res: Response) {
    const { campeonatoId, ...rodadaDTO } = req.body as RequestBody;
    const rodadaDto = req.body;
    const rodada = await this.RodadaService.criar(campeonatoId, rodadaDto);
    return res.json(rodada);
  }
}
