import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from 'typeorm';
import { ProcessosStatusEnum } from '../enum/processosStatus.enum';
import { PeriodosLetivos as PeriodosLetivosSQl } from 'src/periodos-letivos/entities/periodos-letivo.entity';

@Entity('processos')
export class Processo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  identificacao: string;

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

  @OneToOne(() => PeriodosLetivosSQl, periodo => periodo.processo)
  periodoLetivo: PeriodosLetivosSQl;
}
