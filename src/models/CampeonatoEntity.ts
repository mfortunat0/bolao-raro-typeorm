import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rodada } from "./RodadaEntity";
import { Usuario } from "./UsuarioEntity";

@Entity()
export class Campeonato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  nomePopular: string;

  @Column({ nullable: false })
  status: boolean;

  @Column({ nullable: false })
  logo: string;

  @Column({ nullable: false })
  idCampeonatoApiExterna: number;

  @OneToMany(() => Rodada, (rodada) => rodada.campeonato)
  rodadas: Rodada[];

  @ManyToMany(() => Usuario)
  @JoinTable()
  usuarios: Usuario[];
}
