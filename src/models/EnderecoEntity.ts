import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  cep: string;

  @Column({ nullable: false })
  logradouro: string;

  @Column({ nullable: false })
  complemento: string;

  @Column({ nullable: false })
  numero: string;

  @Column({ nullable: false })
  bairro: string;

  @Column({ nullable: false })
  estado: string;
}
