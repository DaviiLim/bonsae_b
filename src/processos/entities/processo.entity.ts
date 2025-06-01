import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Processo {
  @PrimaryGeneratedColumn()
  processoID: number;

  @Column()
  status: string;

  @Column()
  dataInicio: Date;

  @Column()
  dataFim: Date;
}
