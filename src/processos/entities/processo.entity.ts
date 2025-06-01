import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ProcessosStatusEnum } from '../enum/processosStatus.enum';

@Entity('processos')
export class Processo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  processoID: string;

  @Column({
    type: 'enum',
    enum: ProcessosStatusEnum,
    default: ProcessosStatusEnum.EM_ANDAMENTO,
  })
  status: ProcessosStatusEnum;

  @CreateDateColumn({ name: 'data_inicio' })
  dataInicio: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'data_fim' })
  dataFim?: Date;
}
