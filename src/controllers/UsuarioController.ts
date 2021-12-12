import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IUsuarioService } from "../@types/services/IUsuarioService";

@Service("UsuarioController")
export class UsuarioController {
  constructor(
    @Inject("UsuarioService") private usuarioService: IUsuarioService
  ) {}

  async list(request: Request, response: Response) {
    const users = await this.usuarioService.listar();
    response.send(users);
  }

  async get(request: Request, response: Response) {
    try {
      const user = await this.usuarioService.buscar(Number(request.params.id));
      response.send(user);
    } catch ({ message }) {
      response.status(400).json();
    }
  }

  async create(request: Request, response: Response) {
    try {
      const user = await this.usuarioService.criar(request.body);
      response.send(user);
    } catch ({ message }) {
      response.status(400).json();
    }
  }

  async update(request: Request, response: Response) {
    try {
      const user = await this.usuarioService.atualizar(
        Number(request.params.id),
        request.body
      );
      response.send(user);
    } catch ({ message }) {
      response.status(400).json();
    }
  }

  async remove(request: Request, response: Response) {
    try {
      await this.usuarioService.remover(Number(request.params.id));
      response.send();
    } catch ({ message }) {
      response.status(400).json();
    }
  }

  async signIn(request: Request, response: Response) {
    const token = await this.usuarioService.login(request.body);
    response.json({ token });
  }
}
