import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { Inject, Service } from "typedi";
import { IUsuarioService } from "../@types/services/IUsuarioService";
import { CreateUsuarioDto } from "../@types/dto/CreateUsuarioDto";
import { hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AuthUsuarioDto } from "../@types/dto/AuthUsuarioDto";
import { EnderecoService } from "./EnderecoService";
import { Usuario } from "../models/UsuarioEntity";

@Service("UsuarioService")
export class UsuarioService implements IUsuarioService {
  constructor(
    @Inject("UsuarioRepository") private usuarioRepository: IUsuarioRepository,
    @Inject("EnderecoService") private enderecoService: EnderecoService
  ) {}

  async listar() {
    return this.usuarioRepository.find({ relations: ["endereco"] });
  }

  async buscar(id: number) {
    return this.usuarioRepository.findOne(id, { relations: ["endereco"] });
  }

  async criar({ nome, email, senha, cep, numero }: CreateUsuarioDto) {
    const endereco = await this.enderecoService.criar(cep, numero);
    const usuario = new Usuario();
    Object.assign(usuario, {
      nome,
      email,
      hashSenha: hashSync(senha, Number(process.env.SALT)),
      endereco,
    });
    return this.usuarioRepository.save(usuario);
  }

  async atualizar(
    id: number,
    { nome, email, senha, cep, numero }: CreateUsuarioDto
  ) {
    const usuarioToUpdate = await this.usuarioRepository.findOne(id);
    if (!usuarioToUpdate) {
      throw new Error("User not found!");
    }
    const endereco = await this.enderecoService.criar(cep, numero);
    const usuario = new Usuario();
    Object.assign(usuario, {
      ...usuarioToUpdate,
      nome,
      email,
      hashSenha: hashSync(senha, Number(process.env.SALT)),
      endereco,
    });
    await this.usuarioRepository.save({ ...usuario, id });
  }

  async remover(id: number) {
    const userToRemove = await this.usuarioRepository.findOne(id);
    if (!userToRemove) {
      throw new Error("User not found!");
    }

    await this.usuarioRepository.remove(userToRemove);
  }

  async login({ email, senha }: AuthUsuarioDto) {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    if (!usuario) {
      throw new Error("User not found!");
    }
    if (compareSync(senha, usuario.hashSenha)) {
      const { id, email, nome } = usuario;
      return sign({ id, email, nome }, process.env.AUTH_SECRET, {
        expiresIn: "1d",
      });
    }
  }
}
