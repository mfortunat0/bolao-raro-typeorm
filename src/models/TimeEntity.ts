import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Partida } from "./PartidaEntity";

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  sigla: string;

  @Column({ nullable: false })
  escudo: string;

  @OneToMany(() => Partida, (partida) => partida.mandante)
  partidasMandante: Partida[];

  @OneToMany(() => Partida, (partida) => partida.visitante)
  partidasVisitante: Partida[];
}
