import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IApostaService } from "../@types/services/IApostaService";
import { Payload } from "middleware/AuthMiddleware";

@Service("ApostaController")
export class ApostaController {
  constructor(@Inject("ApostaService") private apostaService: IApostaService) {}

  async list(request: Request, response: Response) {
    const { id } = response.locals.user as Payload;
    const users = await this.apostaService.listar(id);
    response.send(users);
  }

  async get(request: Request, response: Response) {
    try {
      const { id } = response.locals.user as Payload;
      const user = await this.apostaService.buscar(
        id,
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
      const user = await this.apostaService.criar(id, request.body);
      response.send(user);
    } catch ({ message }) {
      response.status(400).json({ message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const user = await this.apostaService.atualizar(
        Number(request.params.id),
        request.body
      );
      response.send(user);
    } catch ({ message }) {
      response.status(400).json({ message });
    }
  }

  async ranking() {
    return this.apostaService;
  }
}
