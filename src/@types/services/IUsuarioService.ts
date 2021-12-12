import { Usuario } from "../../models/UsuarioEntity";
import { CreateUsuarioDto } from "../../@types/dto/CreateUsuarioDto";
import { AuthUsuarioDto } from "../../@types/dto/AuthUsuarioDto";

export interface IUsuarioService {
  listar(): Promise<Usuario[]>;
  buscar(id: number): Promise<Usuario>;
  criar(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
  atualizar(id: number, createUsuarioDto: CreateUsuarioDto): Promise<void>;
  remover(id: number): Promise<void>;
  login(authUsuario: AuthUsuarioDto): Promise<string>;
}
