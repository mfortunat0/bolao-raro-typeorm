import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { ICampeonatoService } from "../@types/services/ICampeonatoService";
import { Payload } from "../middleware/AuthMiddleware";

@Service("CampeonatoController")
export class CampeonatoController {
  constructor(
    @Inject("CampeonatoService") private campeonatoService: ICampeonatoService
  ) {}

  async get(request: Request, response: Response) {
    try {
      const user = await this.campeonatoService.buscar(
        Number(request.params.id)
      );
      response.send(user);
    } catch ({ message }) {
      response.status(400).json({ message });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { id } = response.locals.user as Payload;
      const user = await this.campeonatoService.criar(id, request.body);
      response.send(user);
    } catch ({ message }) {
      response.status(400).json({ message });
    }
  }

  async remove(request: Request, response: Response) {
    try {
      await this.campeonatoService.remover(Number(request.params.id));
      response.send();
    } catch ({ message }) {
      response.status(400).json({ message });
    }
  }
}
