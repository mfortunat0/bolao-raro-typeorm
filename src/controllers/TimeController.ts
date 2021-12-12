import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { ITimeService } from "../@types/services/ITimeService";
import { FiltrosPartidas } from "../@types/models/time";

@Service("TimeController")
export class TimeController {
  constructor(@Inject("TimeService") private timeService: ITimeService) {}

  public async partidasMandante(req: Request, res: Response) {
    const filtros = this.getFilters(req);
    const timeId = this.getTimeId(req);
    const partidas = await this.timeService.getPartidasMandante(
      timeId,
      filtros
    );
    res.send(partidas);
  }
  public async partidasVisitante(req: Request, res: Response) {
    const filtros = this.getFilters(req);
    const timeId = this.getTimeId(req);
    const partidas = await this.timeService.getPartidasVisitante(
      timeId,
      filtros
    );
    res.send(partidas);
  }
  public async partidas(req: Request, res: Response) {
    const filtros = this.getFilters(req);
    const timeId = this.getTimeId(req);
    const partidas = await this.timeService.getTodasPartidas(timeId, filtros);
    res.send(partidas);
  }

  private getTimeId(req: Request): number {
    return Number(req.params.timeId);
  }

  private getFilters(req: Request): FiltrosPartidas {
    const campeonatoId = Number(req.query.campeonatoId);
    return {
      campeonatoId,
    };
  }
}
