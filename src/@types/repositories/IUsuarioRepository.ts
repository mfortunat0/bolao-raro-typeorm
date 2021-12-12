import { UsuarioDto } from "../dto/UsuarioDto";
import { Usuario } from "../../models/UsuarioEntity";
import { FindManyOptions, FindOneOptions } from "typeorm";

export interface IUsuarioRepository {
  find(options?: FindManyOptions<Usuario>): Promise<Usuario[]>;
  findOne(
    id?: number,
    options?: FindOneOptions<Usuario>
  ): Promise<Usuario | undefined>;
  findOne(options?: FindOneOptions<Usuario>): Promise<Usuario | undefined>;
  save(userDto: UsuarioDto): Promise<Usuario>;
  remove(entities: Usuario | Usuario[]): Promise<Usuario[]>;
}
