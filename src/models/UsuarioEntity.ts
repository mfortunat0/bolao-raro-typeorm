import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Aposta } from "./ApostaEntity";
import { Campeonato } from "./CampeonatoEntity";
import { Endereco } from "./EnderecoEntity";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hashSenha: string;

  @OneToMany(() => Aposta, (aposta) => aposta.usuario)
  apostas: Aposta[];

  @OneToOne(() => Endereco)
  @JoinColumn()
  endereco: Endereco;
}
