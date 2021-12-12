import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Partida } from "./PartidaEntity";
import { Usuario } from "./UsuarioEntity";

@Entity()
export class Aposta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.apostas)
  usuario: Usuario;

  @Column({ nullable: false })
  placarMandate: number;

  @Column({ nullable: false })
  placarVisitante: number;

  @ManyToOne(() => Partida, (partida) => partida.apostas)
  partida: Partida;
}
