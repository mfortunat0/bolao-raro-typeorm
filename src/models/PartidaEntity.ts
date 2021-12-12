import { StatusAndamento } from "../@types/enums/StatusAndamento";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Aposta } from "./ApostaEntity";
import { Rodada } from "./RodadaEntity";
import { Time } from "./TimeEntity";

@Entity()
export class Partida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  placar: string;

  @ManyToOne(() => Time, {
    cascade: ["insert", "update"],
  })
  mandante: Time;

  @ManyToOne(() => Time, {
    cascade: ["insert", "update"],
  })
  visitante: Time;

  @Column({ nullable: true })
  placarMandante: number;

  @Column({ nullable: true })
  placarVisitante: number;

  @Column({
    enum: [
      StatusAndamento.Agendada,
      StatusAndamento.Andamento,
      StatusAndamento.Finalizado,
    ],
  })
  status: StatusAndamento;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: true })
  dataRealização: Date;

  @ManyToOne(() => Rodada, (rodada) => rodada.partidas)
  rodada: Rodada;

  @OneToMany(() => Aposta, (aposta) => aposta.partida)
  apostas: Aposta[];
}
